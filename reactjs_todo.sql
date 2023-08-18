-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 18, 2023 at 04:23 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `reactjs_todo`
--

-- --------------------------------------------------------

--
-- Table structure for table `todo`
--

CREATE TABLE `todo` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `user` varchar(255) NOT NULL,
  `decription` varchar(500) NOT NULL,
  `status` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `important` varchar(255) NOT NULL,
  `start` date NOT NULL DEFAULT current_timestamp(),
  `end` date NOT NULL DEFAULT current_timestamp(),
  `list` text NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `todo`
--

INSERT INTO `todo` (`id`, `name`, `user`, `decription`, `status`, `type`, `important`, `start`, `end`, `list`, `createdAt`, `updatedAt`) VALUES
(42, 'Khách Hàng', 'chuminhnam', 'a', 'Done', 'Work', 'Yes', '2023-08-15', '2023-08-18', '_a', '2023-08-18 12:19:44', '2023-08-18 12:20:07'),
(43, 'Khách Hàng 3', 'chuminhnam', 'Khách Hàng 3', 'Done', 'Work', 'Yes', '2023-08-16', '2023-08-18', 'Khách Hàng 3', '2023-08-18 13:19:51', '2023-08-18 13:19:51'),
(44, 'Khách Hàng 2', 'chuminhnam', 'Khách Hàng 2', 'Todo', 'Personal', 'Yes', '2023-08-17', '2023-08-19', 'Khách Hàng 2', '2023-08-18 13:36:37', '2023-08-18 13:36:37'),
(45, 'Khách Hàng 4', 'chuminhnam', 'Khách Hàng 4', 'Todo', 'Work', 'No', '2023-08-16', '2023-08-25', 'Khách Hàng 4#Khách Hàng 4', '2023-08-18 13:51:26', '2023-08-18 13:52:27');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `fullname` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `fullname`, `username`, `password`, `createdAt`, `updatedAt`) VALUES
(1, 'Nam Chu Minh', 'namchuminh', 'namchuminh', '2023-08-16 16:30:34', '2023-08-16 16:30:48'),
(2, 'Chu Minh Nam 2', 'namchuminh2', 'nam', '2023-08-16 11:33:59', '2023-08-16 11:33:59'),
(3, 'hiep1998', 'hiep1998', 'hiep1998', '2023-08-16 11:39:57', '2023-08-16 11:39:57'),
(4, 'Chu Minh Nam', 'chuminhnam', 'a', '2023-08-16 11:41:24', '2023-08-18 12:20:28'),
(5, 'Nguyễn Văn A', 'nguyenvana', 'nguyenvana', '2023-08-18 10:52:19', '2023-08-18 10:52:19');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `todo`
--
ALTER TABLE `todo`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `todo`
--
ALTER TABLE `todo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
