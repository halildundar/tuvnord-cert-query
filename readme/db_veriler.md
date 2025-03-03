CREATE DATABASE IF NOT EXISTS `custom` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE tuvnord
CREATE TABLE IF NOT EXISTS `users`(
`id` INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
`name` VARCHAR(50) NOT NULL,
`email` VARCHAR(100) NOT NULL,
`password` VARCHAR(255) NOT NULL,
`role` VARCHAR(255) //sys-admin,admin,user
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `firmalar`(
`id` INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
`kisa_ad` VARCHAR(255) NOT NULL,
`unvan` VARCHAR(255) NOT NULL,
`ilce` VARCHAR(255),
`il` VARCHAR(255),
`adres` VARCHAR(255),
`kayit_tarih` VARCHAR(50) NOT NULL,
`genel_mudur` VARCHAR(50) NOT NULL,
`son_kontrolcu` VARCHAR(100) NOT NULL,
`tel` VARCHAR(255) NOT NULL,
`emil` VARCHAR(255),
`posta_kod` VARCHAR(255),
`vergi_no` VARCHAR(255),
`user_id` INT(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `certs`(
`id` INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
`trade_name` VARCHAR(255) NOT NULL,
`legislation` VARCHAR(255) NOT NULL,
`product_range` VARCHAR(255),
`module` VARCHAR(255),
`status` VARCHAR(255),
`standarts` VARCHAR(50) NOT NULL,
`product_features` VARCHAR(50) NOT NULL,
`start_date` VARCHAR(100) NOT NULL,
`expration_date` VARCHAR(255) NOT NULL,
`release_date` VARCHAR(255),
`registration_deadline` VARCHAR(255),
`cert_no` VARCHAR(255),
`cert_id` INT(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `certs`( `id` INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT, `cert_no` VARCHAR(255), `trade_name` VARCHAR(255) NOT NULL, `legislation` VARCHAR(255) NOT NULL, `product_range` VARCHAR(255), `module` VARCHAR(255), `status` VARCHAR(255), `standarts` VARCHAR(50) NOT NULL, `product_features` VARCHAR(50) NOT NULL, `start_date` VARCHAR(100) NOT NULL, `expration_date` VARCHAR(255) NOT NULL,`cert_id` VARCHAR(255) ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
