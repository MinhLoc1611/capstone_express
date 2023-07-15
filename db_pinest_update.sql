/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

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
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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
(1, 3, 1, '2023-07-12', 'Trông có vẻ mạnh đó, làm trận solo nào');
INSERT INTO `binh_luan` (`binh_luan_id`, `nguoi_dung_id`, `hinh_anh_id`, `ngay_binh_luan`, `noi_dung`) VALUES
(2, 9, 8, '2023-07-12', 'Brother, What of you became');


INSERT INTO `hinh_anh` (`hinh_anh_id`, `ten_hinh`, `duong_dan`, `mo_ta`, `nguoi_dung_id`) VALUES
(1, 'Vạn tộc chi kiếp', '1689133447236to-vu.jpeg', 'Không có kẻ thù mãi mãi, chỉ có lợi ích là vĩnh hằng', 1);
INSERT INTO `hinh_anh` (`hinh_anh_id`, `ten_hinh`, `duong_dan`, `mo_ta`, `nguoi_dung_id`) VALUES
(2, 'Spider Man', '1689133675119spider-man.jpeg', 'Spider Man version Venom', 2);
INSERT INTO `hinh_anh` (`hinh_anh_id`, `ten_hinh`, `duong_dan`, `mo_ta`, `nguoi_dung_id`) VALUES
(3, 'Toàn cầu cao võ', '1689134287599phuong-binh.jpeg', 'Địa quật xâm lấn, võ đạo quật khởi', 3);
INSERT INTO `hinh_anh` (`hinh_anh_id`, `ten_hinh`, `duong_dan`, `mo_ta`, `nguoi_dung_id`) VALUES
(4, 'Mệnh danh thuật của đêm', '1689134394796Khanh-Tran.jpeg', 'Sắt thép cùng thân thể, quá khứ cùng tương lai', 4),
(5, 'Iron Man Chibi', '1689134458720iron-chibi.jpeg', 'I AM IRON MAN', 5),
(6, 'The Flash', '1689134570748flash.jpeg', 'fast, faster and fastest', 6),
(7, 'Dr Strange', '1689134797418dr-strange.jpeg', 'Phù thuỷ tối thượng', 7),
(8, 'Yasuo', '1689135104959yasuo.jpeg', 'Hasagi!', 8),
(9, 'Yone', '1689135150940yone.jpeg', 'Before, I chased a wayward gale. Now I hunt a storm of darkness', 9),
(10, 'Kayn', '1689135242027Kayn.jpeg', 'Shadow Death', 10),
(11, 'starcraft zealot', '16894127039611104420-starcraft-2-wallpaper-1920x1080-1920x1080-photos.jpg', 'For Aiur and glory', 1),
(12, 'Naraka viper ning', '16894127440841139022.jpg', 'Không có kẻ thù mãi mãi, chỉ có lợi ích là vĩnh hằng', 1),
(13, 'Naraka wallpaper', '16894127691021173402.jpg', 'Địa quật xâm lấn, võ đạo quật khởi', 1),
(14, 'Naraka justina wu', '16894127852551265157.jpg', 'Địa quật xâm lấn, võ đạo quật khởi', 2),
(15, 'Nebula', '1689412818494arch_nebula-wallpaper-1920x1080.jpg', 'Vũ trụ vô biên', 3),
(16, 'Assassin creed', '1689412846633assassins_creed_odyssey_2019-wallpaper-1920x1080.jpg', 'Chiến binh la mã', 3),
(17, 'Assassin creed logo', '1689412874765assassins_creed_unity_logo_high_resolution-wallpaper-1920x1080.jpg', 'Logo xám xanh của  gaem assassin greed', 4),
(18, 'Battle field', '1689412919020battlefield_3_video_game_2-wallpaper-1920x1080.jpg', 'Chiến binh ánh sáng battle field', 4),
(19, 'Diablo', '1689412975180diablo_3_concept_art-wallpaper-1920x1080.jpg', 'Ác quỹ địa ngục, tàn ác hung bạo', 5),
(20, 'Bão tố phong ba', '1689413012594Giong-bao_-1-1920x1097.jpg', 'Bão tố phong ba, giông bão hung tàn', 5),
(21, 'Bão tố phong ba', '1689413020053Giong-bao_-5.jpg', 'Bão tố phong ba, giông bão hung tàn', 6),
(22, 'Bão tố phong ba', '1689413025364Giong-bao_-6-1920x1080.jpg', 'Bão tố phong ba, giông bão hung tàn', 6),
(23, 'Bão tố phong ba', '1689413028450Giong-bao_-7-1920x1200.jpg', 'Bão tố phong ba, giông bão hung tàn', 6),
(24, 'Bão tố phong ba', '1689413038920Giong-bao_-7-1920x1200.jpg', 'Bão tố phong ba, giông bão hung tàn', 6),
(25, 'Bão tố phong ba', '1689413048383Giong-bao_-9.jpg', 'Bão tố phong ba, giông bão hung tàn', 6),
(26, 'Bão tố phong ba', '1689413051725Giong-bao_-10.jpg', 'Bão tố phong ba, giông bão hung tàn', 6),
(27, 'Chúa tể chiến tranh', '1689413095258god_of_war_ps4-wallpaper-1920x1080.jpg', 'God of war battling with white troll', 7),
(28, 'Warcraft lord', '1689413211798hinh-nen-an-tuong-0.jpg', 'Arthas the lich king', 7),
(29, 'Riven v Yasuo LoL', '1689413256453hinh-nen-lien-minh-dep-129.jpg', 'Riven chiến với Yasuo liên minh huyền thoại', 8),
(30, 'Phi hành gia astro', '1689413293571Phi-hanh-gia_-2-1920x1080.jpg', 'Phi hành gia trong vũ trụ nhỏ bé', 8),
(31, 'Phi hành gia astro', '1689413297717Phi-hanh-gia_-12-1920x742.jpg', 'Phi hành gia trong vũ trụ nhỏ bé', 8),
(32, 'Phi hành gia astro and robot', '1689413322039Robot_-7-1920x1166.jpg', 'Phi hành gia trong vũ trụ nhỏ bé cùng với robot', 8),
(33, 'War of the robot', '1689413345916Robot_-10-1920x1014.jpg', 'Đại chiến robot', 9),
(34, 'Warcraft Kerrigan', '1689413474441sarah_kerrigan_queen_of_blades_starcraft_2-wallpaper-1920x1080.jpg', 'Warcraft ác quỹ bóng đêm, nữ hoàng đầm lầy', 9),
(35, 'Warcraft wing of liberty', '1689413512302starcraft_ii__wings_of_liberty-wallpaper-1920x1200.jpg', 'Warcraft chiến binh cực ngầu', 9),
(36, 'Super girl', '1689413543862Supergirl_-16.jpg', 'Nữ siêu nhân giải cứu nhân loại', 10),
(37, 'Super girl', '1689413545330Supergirl_-16.jpg', 'Nữ siêu nhân giải cứu nhân loại', 10),
(38, 'Tàu ngầm', '1689413583255Tau-ngam_-9-1920x1181.jpg', 'Tàu ngầm dưới dại dương mênh mông', 10),
(39, 'Tàu ngầm 2', '1689413590499Tau-ngam_-10-1920x804.jpg', 'Tàu ngầm dưới dại dương mênh mông 2', 10),
(40, 'Uzui tengen', '1689413626492Thanh-guom-diet-quy_-3-1920x1080.jpg', 'Kiếm sỹ diệt quỹ, Âm trụ, tengen', 10),
(41, 'Tập thể trụ cột sát quỷ đoàn', '1689413651485Thanh-guom-diet-quy_-7-1920x1080.jpg', 'Tập thể trụ cột sát quỷ đoàn', 10),
(42, 'Uzui Tegen', '1689413714542Thanh-guom-diet-quy_-8-1920x1080.jpg', 'Âm trụ sát quỷ đoàn, chiến đấu diệt quỷ', 10),
(43, 'Viêm trụ rengoku', '1689413744982Thanh-guom-diet-quy_-12-1920x1080.jpg', 'Trái tim quả cảm rực lữa', 1),
(44, 'Hà trụ muichiro', '1689413808709Thanh-guom-diet-quy_-19-1920x1080.jpg', 'Nhẹ nhàng và lạnh lùng như sương mù', 1),
(45, 'Phong trụ Sanemi', '1689413898381Thanh-guom-diet-quy_-26-1920x1080.jpg', 'Sức khỏe vượt trội, tốc độ cao, sức bền vô địch', 1),
(46, 'Trùng trụ Shinobu', '1689413968180Thanh-guom-diet-quy_-27-1920x1080.jpg', 'Fly like a butterfly, sting like a bee', 2),
(47, 'Âm trụ Tengen', '1689413998546Thanh-guom-diet-quy_-29-1920x1080.jpg', 'Hào nhoáng !!!!!!!', 2),
(48, 'Cụ Yorichi', '1689414076434Thanh-guom-diet-quy_-30-1920x1080.jpg', 'Người mạnh nhất lich sử, vạn quỷ khiếp sợ', 2),
(49, 'Zenitsu', '1689414102157Thanh-guom-diet-quy_-32-1920x1080.jpg', 'Pikachuuuuuuuuuuuu ', 2),
(50, 'The Flash', '1689414146427The-Flash_-2-1920x1080.jpg', 'The Flash logo', 3),
(51, 'The Flash', '1689414158561The-Flash_-8-1920x1080.jpg', 'The Flash ultimate', 3),
(52, 'The Flash', '1689414176780The-Flash_-21-1920x1080.jpg', 'The Flash paradox', 3),
(53, 'Dragon hunter', '1689414203874Tho-san_-1-1920x1202.jpg', 'The monster never give up on the battle', 3),
(54, 'Black hunter', '1689414232227Tho-san_-3-1920x1200.jpg', 'You cannot hide from my bullet', 3),
(55, 'Black hunter', '1689414272015Tho-san_-4-1920x1200.jpg', 'Chase you down', 3),
(56, 'Black hunter', '1689414282059Tho-san_-6-1920x1080.jpg', 'Chase you down', 3),
(57, 'Black hunter', '1689414298843Tho-san_-9-1920x1080.jpg', 'Chase you down, with my crowbow', 3),
(58, 'Starwar the clone war', '1689414326944Tho-san_-4-1920x1200.jpg', 'Chiến binh clone', 4);



INSERT INTO `nguoi_dung` (`nguoi_dung_id`, `email`, `matkhau`, `ho_ten`, `tuoi`, `anh_dai_dien`) VALUES
(1, 'tovu@gmail.com', '$2b$10$NMGFBEfBwT20bx1i.kkvyexWswNqn1nQJAxiZbxKzTgOIMfNVQqCS', 'Tô Vũ', 18, NULL);
INSERT INTO `nguoi_dung` (`nguoi_dung_id`, `email`, `matkhau`, `ho_ten`, `tuoi`, `anh_dai_dien`) VALUES
(2, 'spiderman@gmail.com', '$2b$10$8hcVithqy.ZDax/5o3QxG.hrwINKYsrzWyCi76XZKmVg15FwcJ.Dq', 'Spider Man', 18, NULL);
INSERT INTO `nguoi_dung` (`nguoi_dung_id`, `email`, `matkhau`, `ho_ten`, `tuoi`, `anh_dai_dien`) VALUES
(3, 'phuongbinh@gmail.com', '$2b$10$KR3VxaDezuuRWFx1NCjgeujjwRlPqOzynxYjP6tAocmEGhiRnMVtq', 'Phương Bình', 18, NULL);
INSERT INTO `nguoi_dung` (`nguoi_dung_id`, `email`, `matkhau`, `ho_ten`, `tuoi`, `anh_dai_dien`) VALUES
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