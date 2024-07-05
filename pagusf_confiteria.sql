-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: mysql-pagusf.alwaysdata.net
-- Generation Time: Jul 06, 2024 at 12:26 AM
-- Server version: 10.11.8-MariaDB
-- PHP Version: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pagusf_confiteria`
--

-- --------------------------------------------------------

--
-- Table structure for table `categorias`
--

CREATE TABLE `categorias` (
  `id_categoria` int(11) NOT NULL,
  `categoria` varchar(80) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categorias`
--

INSERT INTO `categorias` (`id_categoria`, `categoria`) VALUES
(1, 'Pasteles'),
(2, 'Galletas'),
(3, 'Cupcakes'),
(4, 'Panadería'),
(5, 'Bebidas'),
(6, 'Postres'),
(7, 'Tortas'),
(8, 'Helados'),
(9, 'Snacks'),
(10, 'Chocolate');

-- --------------------------------------------------------

--
-- Table structure for table `contacto`
--

CREATE TABLE `contacto` (
  `id_contacto` int(11) NOT NULL,
  `nombre` varchar(80) DEFAULT NULL,
  `apellido` varchar(80) DEFAULT NULL,
  `genero` varchar(20) DEFAULT NULL,
  `gmail` varchar(80) DEFAULT NULL,
  `como_nos_conociste` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `contacto`
--

INSERT INTO `contacto` (`id_contacto`, `nombre`, `apellido`, `genero`, `gmail`, `como_nos_conociste`) VALUES
(1, 'María', 'González', 'Femenino', 'maria.gonzalez@example.com', 'Por recomendación de un amigo'),
(2, 'Carlos', 'Martínez', 'Masculino', 'carlos.martinez@example.com', 'Búsqueda en línea'),
(3, 'Laura', 'Rodríguez', 'Femenino', 'laura.rodriguez@example.com', 'Evento local'),
(4, 'Pedro', 'Sánchez', 'Masculino', 'pedro.sanchez@example.com', 'Anuncio en periódico'),
(5, 'Ana', 'López', 'Femenino', 'ana.lopez@example.com', 'Redes sociales'),
(6, 'Jorge', 'Hernández', 'Masculino', 'jorge.hernandez@example.com', 'Recomendación familiar'),
(7, 'Elena', 'García', 'Femenino', 'elena.garcia@example.com', 'Evento de la comunidad'),
(8, 'Miguel', 'Pérez', 'Masculino', 'miguel.perez@example.com', 'Campaña publicitaria'),
(9, 'Sofía', 'Díaz', 'Femenino', 'sofia.diaz@example.com', 'Recomendación de trabajo'),
(10, 'Alejandro', 'Ramírez', 'Masculino', 'alejandro.ramirez@example.com', 'Feria local');

-- --------------------------------------------------------

--
-- Table structure for table `productos`
--

CREATE TABLE `productos` (
  `id_productos` int(11) NOT NULL,
  `nombre` varchar(80) DEFAULT NULL,
  `precio` int(11) DEFAULT NULL,
  `stock` int(11) DEFAULT NULL,
  `id_categoria` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `productos`
--

INSERT INTO `productos` (`id_productos`, `nombre`, `precio`, `stock`, `id_categoria`) VALUES
(1, 'Pastel de Chocolate', 350, 10, 1),
(2, 'Cupcake de Vainilla', 50, 20, 3),
(3, 'Galletas de Mantequilla', 15, 50, 2),
(4, 'Pan Baguette', 25, 30, 4),
(5, 'Refresco de Limón', 20, 100, 5),
(6, 'Helado de Fresa', 30, 15, 8),
(7, 'Torta de Cumpleaños', 500, 5, 7),
(8, 'Brownie de Chocolate', 40, 25, 6),
(9, 'Snack de Queso', 10, 50, 9),
(10, 'Chocolate Amargo', 8, 40, 10);

-- --------------------------------------------------------

--
-- Table structure for table `sucursales`
--

CREATE TABLE `sucursales` (
  `id_sucursal` int(11) NOT NULL,
  `direccion` varchar(200) DEFAULT NULL,
  `vigencia` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sucursales`
--

INSERT INTO `sucursales` (`id_sucursal`, `direccion`, `vigencia`) VALUES
(1, 'Av. Principal 456, Ciudad Central', 1),
(2, 'Calle del Sol 789, Pueblo Nuevo', 1),
(3, 'Paseo de la Luna 123, Villa Serena', 0),
(4, 'Av. Libertad 890, Colonia Verde', 1),
(5, 'Av. del Bosque 456, Bosques del Sur', 0),
(6, 'Calle Principal 789, San Martín', 1),
(7, 'Av. de los Robles 234, Ciudad Jardín', 1),
(8, 'Calle del Centro 567, Central Park', 0),
(9, 'Av. Primavera 890, Florido', 1),
(10, 'Paseo del Sol 123, Sol Naciente', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`id_categoria`);

--
-- Indexes for table `contacto`
--
ALTER TABLE `contacto`
  ADD PRIMARY KEY (`id_contacto`);

--
-- Indexes for table `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id_productos`),
  ADD KEY `fk_ic` (`id_categoria`);

--
-- Indexes for table `sucursales`
--
ALTER TABLE `sucursales`
  ADD PRIMARY KEY (`id_sucursal`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categorias`
--
ALTER TABLE `categorias`
  MODIFY `id_categoria` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `contacto`
--
ALTER TABLE `contacto`
  MODIFY `id_contacto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `productos`
--
ALTER TABLE `productos`
  MODIFY `id_productos` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `sucursales`
--
ALTER TABLE `sucursales`
  MODIFY `id_sucursal` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `productos`
--
ALTER TABLE `productos`
  ADD CONSTRAINT `fk_ic` FOREIGN KEY (`id_categoria`) REFERENCES `categorias` (`id_categoria`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
