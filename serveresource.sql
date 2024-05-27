/*
 Navicat Premium Data Transfer

 Source Server         : mysql
 Source Server Type    : MySQL
 Source Server Version : 50724
 Source Host           : 47.99.93.97:8836
 Source Schema         : nest-serve

 Target Server Type    : MySQL
 Target Server Version : 50724
 File Encoding         : 65001

 Date: 27/04/2024 17:55:26
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for serveresource
-- ----------------------------
DROP TABLE IF EXISTS `serveresource`;
CREATE TABLE `serveresource` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `create_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `update_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `create_user` varchar(255) NOT NULL COMMENT '创建人',
  `update_user` varchar(255) NOT NULL COMMENT '更新人',
  `name` varchar(255) NOT NULL COMMENT '资源名称',
  `type` int(11) NOT NULL COMMENT '资源类型',
  `remark` varchar(255) NOT NULL COMMENT '资源备注',
  `url` varchar(255) NOT NULL COMMENT '资源地址',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of serveresource
-- ----------------------------
BEGIN;
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
