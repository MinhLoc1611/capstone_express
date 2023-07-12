-- -------------------------------------------------------------
-- TablePlus 5.3.8(500)
--
-- https://tableplus.com/
--
-- Database: db_pinest
-- Generation Time: 2023-07-12 11:37:43.0810
-- -------------------------------------------------------------


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

DROP DATABASE IF EXISTS db_pinest;
CREATE DATABASE db_pinest;
USE db_pinest;

CREATE TABLE `binh_luan` (
  `binh_luan_id` int NOT NULL AUTO_INCREMENT,
  `nguoi_dung_id` int DEFAULT NULL,
  `hinh_anh_id` int DEFAULT NULL,
  `ngay_binh_luan` date DEFAULT NULL,
  `noi_dung` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`binh_luan_id`),
  KEY `nguoi_dung_id` (`nguoi_dung_id`),
  KEY `hinh_anh_id` (`hinh_anh_id`),
  CONSTRAINT `binh_luan_ibfk_1` FOREIGN KEY (`nguoi_dung_id`) REFERENCES `nguoi_dung` (`nguoi_dung_id`),
  CONSTRAINT `binh_luan_ibfk_2` FOREIGN KEY (`hinh_anh_id`) REFERENCES `hinh_anh` (`hinh_anh_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `hinh_anh` (
  `hinh_anh_id` int NOT NULL AUTO_INCREMENT,
  `ten_hinh` varchar(100) DEFAULT NULL,
  `duong_dan` varchar(100) DEFAULT NULL,
  `mo_ta` varchar(100) DEFAULT NULL,
  `nguoi_dung_id` int DEFAULT NULL,
  PRIMARY KEY (`hinh_anh_id`),
  KEY `nguoi_dung_id` (`nguoi_dung_id`),
  CONSTRAINT `hinh_anh_ibfk_1` FOREIGN KEY (`nguoi_dung_id`) REFERENCES `nguoi_dung` (`nguoi_dung_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `luu_anh` (
  `nguoi_dung_id` int NOT NULL,
  `hinh_anh_id` int NOT NULL,
  `ngay_luu` date DEFAULT NULL,
  PRIMARY KEY (`nguoi_dung_id`,`hinh_anh_id`),
  KEY `hinh_anh_id` (`hinh_anh_id`),
  KEY `nguoi_dung_id` (`nguoi_dung_id`) USING BTREE,
  CONSTRAINT `luu_anh_ibfk_1` FOREIGN KEY (`nguoi_dung_id`) REFERENCES `nguoi_dung` (`nguoi_dung_id`),
  CONSTRAINT `luu_anh_ibfk_2` FOREIGN KEY (`hinh_anh_id`) REFERENCES `hinh_anh` (`hinh_anh_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `nguoi_dung` (
  `nguoi_dung_id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(100) DEFAULT NULL,
  `matkhau` varchar(100) DEFAULT NULL,
  `ho_ten` varchar(100) DEFAULT NULL,
  `tuoi` int DEFAULT NULL,
  `anh_dai_dien` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`nguoi_dung_id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `binh_luan` (`binh_luan_id`, `nguoi_dung_id`, `hinh_anh_id`, `ngay_binh_luan`, `noi_dung`) VALUES
(1, 3, 1, '2023-07-12', 'Trông có vẻ mạnh đó, làm trận solo nào'),
(2, 9, 8, '2023-07-12', 'Brother, What of you became');

INSERT INTO `hinh_anh` (`hinh_anh_id`, `ten_hinh`, `duong_dan`, `mo_ta`, `nguoi_dung_id`) VALUES
(1, 'Vạn tộc chi kiếp', '1689133447236to-vu.jpeg', 'Không có kẻ thù mãi mãi, chỉ có lợi ích là vĩnh hằng', 1),
(2, 'Spider Man', '1689133675119spider-man.jpeg', 'Spider Man version Venom', 2),
(3, 'Toàn cầu cao võ', '1689134287599phuong-binh.jpeg', 'Địa quật xâm lấn, võ đạo quật khởi', 3),
(4, 'Mệnh danh thuật của đêm', '1689134394796Khanh-Tran.jpeg', 'Sắt thép cùng thân thể, quá khứ cùng tương lai', 4),
(5, 'Iron Man Chibi', '1689134458720iron-chibi.jpeg', 'I AM IRON MAN', 5),
(6, 'The Flash', '1689134570748flash.jpeg', 'fast, faster and fastest', 6),
(7, 'Dr Strange', '1689134797418dr-strange.jpeg', 'Phù thuỷ tối thượng', 7),
(8, 'Yasuo', '1689135104959yasuo.jpeg', 'Hasagi!', 8),
(9, 'Yone', '1689135150940yone.jpeg', 'Before, I chased a wayward gale. Now I hunt a storm of darkness', 9),
(10, 'Kayn', '1689135242027Kayn.jpeg', 'Shadow Death', 10);

INSERT INTO `nguoi_dung` (`nguoi_dung_id`, `email`, `matkhau`, `ho_ten`, `tuoi`, `anh_dai_dien`) VALUES
(1, 'tovu@gmail.com', '$2b$10$NMGFBEfBwT20bx1i.kkvyexWswNqn1nQJAxiZbxKzTgOIMfNVQqCS', 'Tô Vũ', 18, NULL),
(2, 'spiderman@gmail.com', '$2b$10$8hcVithqy.ZDax/5o3QxG.hrwINKYsrzWyCi76XZKmVg15FwcJ.Dq', 'Spider Man', 18, NULL),
(3, 'phuongbinh@gmail.com', '$2b$10$KR3VxaDezuuRWFx1NCjgeujjwRlPqOzynxYjP6tAocmEGhiRnMVtq', 'Phương Bình', 18, NULL),
(4, 'khanhtran@gmail.com', '$2b$10$v1lB7JqACG4BrFCUdIZH/udsDLH.btOd4UHjpUqU3AZwF4fXWpmtq', 'Khánh Trần', 18, NULL),
(5, 'ironman@gmail.com', '$2b$10$cq4YxNBPLfmpznTtVOMZcuV6ILRlaGLh1WvDzFAZqBL60QG..NvHG', 'Iron Man Chibi', 18, NULL),
(6, 'flash@gmail.com', '$2b$10$l8/uHNIqhVy/9Fwz12TqleGgJjs5Q2zrIEhQNd1/c6WJKZVGZGJWq', 'Flash', 28, NULL),
(7, 'drstrange@gmail.com', '$2b$10$.p/m2p5fXBcDq9PWLbkdMeNklTJgeeJX1XbPz7fHZJOlkBz5QjDuC', 'Dr Strange', 40, NULL),
(8, 'yasuo@gmail.com', '$2b$10$2UNApaej0w3znakvX7SCruDkX7Pxbf64h4h6iKI4qKjHL.Gvb9H/.', 'Yasuo', 18, NULL),
(9, 'yone@gmail.com', '$2b$10$bQGMxVYL114Aa6JfH4WoW.Gdk2jJiax8tencZzx8MdOi3.27Jh69a', 'Yone', 18, NULL),
(10, 'kayn@gmail.com', '$2b$10$0DkdoR7nYJOm9r.Z9LOAz.v/cokQxUm/zW3zAoUI/ZwX4CVFF2.rS', 'Kayn', 18, NULL);



/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;