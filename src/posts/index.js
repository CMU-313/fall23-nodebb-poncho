"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.modifyPostByPrivilege = exports.getPostIndices = exports.getPidIndex = exports.getPostSummariesFromSet = exports.getPostsByPids = exports.getPidsFromSet = exports.exists = exports.Posts = void 0;
const lodash_1 = __importDefault(require("lodash"));
const database_1 = __importDefault(require("../database"));
const utils_1 = __importDefault(require("../utils"));
const user_1 = __importDefault(require("../user"));
const privileges_1 = __importDefault(require("../privileges"));
const plugins_1 = __importDefault(require("../plugins"));
const create_1 = require("./create");
const delete_1 = require("./delete");
const edit_1 = require("./edit");
const parse_1 = require("./parse");
const user_2 = require("./user");
const topics_1 = require("./topics");
const category_1 = require("./category");
const summary_1 = require("./summary");
const recent_1 = require("./recent");
const tools_1 = require("./tools");
const votes_1 = require("./votes");
const bookmarks_1 = require("./bookmarks");
const queue_1 = require("./queue");
const diffs_1 = require("./diffs");
const uploads_1 = require("./uploads");
exports.Posts = {};
(0, create_1.createPosts)(exports.Posts);
(0, delete_1.deletePosts)(exports.Posts);
(0, edit_1.editPosts)(exports.Posts);
(0, parse_1.parsePosts)(exports.Posts);
(0, user_2.userPosts)(exports.Posts);
(0, topics_1.topicsPosts)(exports.Posts);
(0, category_1.categoryPosts)(exports.Posts);
(0, summary_1.summaryPosts)(exports.Posts);
(0, recent_1.recentPosts)(exports.Posts);
(0, tools_1.toolsPosts)(exports.Posts);
(0, votes_1.votesPosts)(exports.Posts);
(0, bookmarks_1.bookmarksPosts)(exports.Posts);
(0, queue_1.queuePosts)(exports.Posts);
(0, diffs_1.diffsPosts)(exports.Posts);
(0, uploads_1.uploadsPosts)(exports.Posts);
function exists(pids) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield database_1.default.exists(Array.isArray(pids) ? pids.map((pid) => `post:${pid}`) : `post:${pids}`);
    });
}
exports.exists = exists;
;
function getPidsFromSet(set, start, stop, reverse) {
    return __awaiter(this, void 0, void 0, function* () {
        if (isNaN(start) || isNaN(stop)) {
            return [];
        }
        return yield database_1.default[reverse ? 'getSortedSetRevRange' : 'getSortedSetRange'](set, start, stop);
    });
}
exports.getPidsFromSet = getPidsFromSet;
;
function getPostsByPids(pids, uid) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!Array.isArray(pids) || !pids.length) {
            return [];
        }
        let posts = yield exports.Posts.getPostsData(pids);
        posts = yield Promise.all(posts.map(exports.Posts.parsePost));
        const data = yield plugins_1.default.hooks.fire('filter:post.getPosts', { posts, uid });
        if (!data || !Array.isArray(data.posts)) {
            return [];
        }
        return data.posts.filter(Boolean);
    });
}
exports.getPostsByPids = getPostsByPids;
;
function getPostSummariesFromSet(set, uid, start, stop) {
    return __awaiter(this, void 0, void 0, function* () {
        let pids = yield database_1.default.getSortedSetRevRange(set, start, stop);
        pids = yield privileges_1.default.posts.filter('topics:read', pids, uid);
        const posts = yield exports.Posts.getPostSummaryByPids(pids, uid, { stripTags: false });
        return { posts, nextStart: stop + 1 };
    });
}
exports.getPostSummariesFromSet = getPostSummariesFromSet;
;
function getPidIndex(pid, tid, topicPostSort) {
    return __awaiter(this, void 0, void 0, function* () {
        const set = topicPostSort === 'most_votes' ? `tid:${tid}:posts:votes` : `tid:${tid}:posts`;
        const reverse = topicPostSort === 'newest_to_oldest' || topicPostSort === 'most_votes';
        const index = yield database_1.default[reverse ? 'sortedSetRevRank' : 'sortedSetRank'](set, pid);
        if (!utils_1.default.isNumber(index)) {
            return 0;
        }
        return utils_1.default.isNumber(index) ? parseInt(index, 10) + 1 : 0;
    });
}
exports.getPidIndex = getPidIndex;
;
function getPostIndices(posts, uid) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!Array.isArray(posts) || !posts.length) {
            return [];
        }
        const settings = yield user_1.default.getSettings(uid);
        const byVotes = settings.topicPostSort === 'most_votes';
        let sets = posts.map((p) => byVotes ? `tid:${p.tid}:posts:votes` : `tid:${p.tid}:posts`);
        const reverse = settings.topicPostSort === 'newest_to_oldest' || settings.topicPostSort === 'most_votes';
        const uniqueSets = lodash_1.default.uniq(sets);
        let method = reverse ? 'sortedSetsRevRanks' : 'sortedSetsRanks';
        if (uniqueSets.length === 1) {
            method = reverse ? 'sortedSetRevRanks' : 'sortedSetRanks';
            sets = uniqueSets[0];
        }
        const pids = posts.map((post) => post.pid);
        const indices = yield database_1.default[method](sets, pids);
        return indices.map((index) => (utils_1.default.isNumber(index) ? parseInt(index, 10) + 1 : 0));
    });
}
exports.getPostIndices = getPostIndices;
;
function modifyPostByPrivilege(post, privileges) {
    return __awaiter(this, void 0, void 0, function* () {
        if (post && post.deleted && !(post.selfPost || privileges['posts:view_deleted'])) {
            post.content = '[[topic:post_is_deleted]]';
            if (post.user) {
                post.user.signature = '';
            }
        }
    });
}
exports.modifyPostByPrivilege = modifyPostByPrivilege;
;
require('../promisify')(exports.Posts);
