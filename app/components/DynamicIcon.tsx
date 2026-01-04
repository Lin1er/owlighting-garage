import { IconType } from "react-icons";
import {
  FaPlug,
  FaShieldAlt,
  FaMicroscope,
  FaBolt,
  FaBullseye,
  FaTools,
  FaLightbulb,
  FaRocket,
  FaTrophy,
  FaCog,
  FaCheckCircle,
  FaFire,
  FaBatteryFull,
  FaWrench,
  FaTint,
  FaRuler,
  FaStar,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaGlobe,
  FaComments,
  FaCar,
} from "react-icons/fa";

import {
  IoFlashOutline,
  IoLocationSharp,
  IoCall,
  IoMail,
  IoSparkles,
  IoHardwareChip,
} from "react-icons/io5";

import {
  MdLightbulb,
  MdBuild,
  MdSecurity,
  MdElectricBolt,
} from "react-icons/md";

import { HiOutlinePhoto, HiOutlineSquare3Stack3D } from "react-icons/hi2";

import { BiSolidBulb } from "react-icons/bi";

// Icon mapping - ini untuk convert string ke actual icon component
const iconMap: { [key: string]: IconType } = {
  // Font Awesome Icons
  FaPlug,
  FaShieldAlt,
  FaMicroscope,
  FaBolt,
  FaBullseye,
  FaTools,
  FaLightbulb,
  FaRocket,
  FaTrophy,
  FaCog,
  FaCheckCircle,
  FaFire,
  FaBatteryFull,
  FaWrench,
  FaTint,
  FaRuler,
  FaStar,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaGlobe,
  FaComments,
  FaCar,

  // Ionicons
  IoFlashOutline,
  IoLocationSharp,
  IoCall,
  IoMail,
  IoSparkles,
  IoHardwareChip,

  // Material Design Icons
  MdLightbulb,
  MdBuild,
  MdSecurity,
  MdElectricBolt,

  // Hero Icons
  HiOutlinePhoto,
  HiOutlineSquare3Stack3D,

  // BoxIcons
  BiSolidBulb,
};

interface DynamicIconProps {
  name: string;
  className?: string;
  size?: number;
}

export function DynamicIcon({ name, className = "", size }: DynamicIconProps) {
  const IconComponent = iconMap[name];

  if (!IconComponent) {
    // Fallback ke lightbulb jika icon tidak ditemukan
    return <FaLightbulb className={className} size={size} />;
  }

  return <IconComponent className={className} size={size} />;
}

export { iconMap };
