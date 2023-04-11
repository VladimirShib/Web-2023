CREATE TABLE post
(
   `post_id`      INT NOT NULL AUTO_INCREMENT,
   `link`         VARCHAR(255) NOT NULL,
   `title`        VARCHAR(255) NOT NULL,
   `subtitle`     VARCHAR(255) NOT NULL,
   `img_modifier` VARCHAR(255) NOT NULL,
   `author`       VARCHAR(255) NOT NULL,
   `author_img`   VARCHAR(255) NOT NULL,
   `publish_date` VARCHAR(255) NOT NULL,
   `text`         TEXT NOT NULL,
   `featured` TINYINT(1),
   PRIMARY KEY (`post_id`)
) ENGINE = InnoDB
CHARACTER SET = utf8mb4
COLLATE utf8mb4_unicode_ci
;