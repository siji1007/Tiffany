-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 18, 2025 at 11:57 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bombase`
--

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `product_id` int(11) NOT NULL,
  `product_name` varchar(255) NOT NULL,
  `product_price` decimal(10,2) NOT NULL,
  `product_stocks` int(11) DEFAULT NULL,
  `product_image` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`product_id`, `product_name`, `product_price`, `product_stocks`, `product_image`) VALUES
(1, 'Premium Rice', 1200.00, 99, 'https://via.placeholder.com/150?text=Premium+Rice'),
(2, 'Brown Sugar', 480.00, 70, 'https://via.placeholder.com/150?text=Brown+Sugar'),
(3, 'Cooking Oil', 600.00, 60, 'https://via.placeholder.com/150?text=Cooking+Oil'),
(4, 'All-Purpose Flour', 450.00, 75, 'https://via.placeholder.com/150?text=All-Purpose+Flour'),
(5, 'Iodized Salt', 150.00, 90, 'https://via.placeholder.com/150?text=Iodized+Salt'),
(6, 'Soy Sauce', 540.00, 50, 'https://via.placeholder.com/150?text=Soy+Sauce'),
(7, 'Canned Sardines', 950.00, 120, 'https://via.placeholder.com/150?text=Canned+Sardines'),
(8, 'Evaporated Milk', 1680.00, 40, 'https://via.placeholder.com/150?text=Evaporated+Milk'),
(9, 'Instant Noodles', 1200.00, 200, 'https://via.placeholder.com/150?text=Instant+Noodles'),
(10, 'Coffee Sachets', 1000.00, 150, 'https://via.placeholder.com/150?text=Coffee+Sachets');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`product_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
