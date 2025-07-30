-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 31/07/2025 às 01:58
-- Versão do servidor: 10.4.28-MariaDB
-- Versão do PHP: 8.1.17

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `nexusrh`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `nome` varchar(245) NOT NULL,
  `DataNasc` date DEFAULT NULL,
  `DataAdm` date DEFAULT NULL,
  `Aso` date DEFAULT NULL,
  `Cargo` varchar(150) NOT NULL,
  `Telefone` varchar(15) NOT NULL,
  `CPF` varchar(14) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `nome`, `DataNasc`, `DataAdm`, `Aso`, `Cargo`, `Telefone`, `CPF`) VALUES
(1, 'adm@gmail.com', '123456', 'Adm', '1985-01-01', '2025-01-01', '2025-01-02', 'Administrador', '81988888888', '123.456.789-11'),
(3, 'Lucas', '123456', 'lshdib', NULL, '0000-00-00', '0000-00-00', 'Adm', '8693-2596', '123.265.598-23'),
(4, 'Lucas', '123456', 'lshdib', NULL, '0000-00-00', '0000-00-00', 'Adm', '8693-2596', '123.265.598-23'),
(6, 'Luca', '123456', 'lshdib', NULL, '0000-00-00', '0000-00-00', 'Adm', '8693-2596', '123.265.598-23'),
(7, 'Luca', '123456', 'lshdib', '0000-00-00', '0000-00-00', '0000-00-00', 'Adm', '8693-2596', '123.265.598-23'),
(8, 'jhk@hfgh.hg', 'password', 'kj', '2000-05-02', '2025-08-02', '5236-12-02', 'jkjko', '12332144123', '12312312312');

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
