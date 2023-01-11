/**
 * @typedef Data
 * @type {Object}
 * @property {Anime[]} data
 * @property {number} total
 * @property {number} limit
 * @property {number} offset
 */

/**
 * @typedef Anime
 * @type {Object}
 * @property {string} updated_at
 * @property {*} comment
 * @property {*[]} tags
 * @property {Subject} subject
 * @property {number} subject_id
 * @property {number} vol_status
 * @property {number} ep_status
 * @property {number} subject_type
 * @property {number} type
 * @property {number} rate
 * @property {boolean} private
 * @property {number} [index]
 */

/**
 * @typedef Subject
 * @type {Object}
 * @property {string} date
 * @property {{ small: string, grid: string, large: string, medium: string, common: string }} images
 * @property {string} name
 * @property {string} name_cn
 * @property {string} short_summary
 * @property {{ name: string, count: number }[]} tags
 * @property {number} score
 * @property {number} type
 * @property {number} id
 * @property {number} eps
 * @property {number} volumes
 * @property {number} collection_total
 * @property {number} rank
 */

/**
 * @typedef Config
 * @type {Object}
 * @property {Object.<string, string>} replace
 */

module.exports = {}
