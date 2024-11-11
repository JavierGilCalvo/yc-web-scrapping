import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDateToMonthYear(dateString: string) {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "numeric",
  }).format(date);
}

export const industryEquivalence = {
  "Artificial Intelligence (AI)": "AI",
  "Machine Learning": "ML",
  "Generative AI": "GenAI",
  "Natural Language Processing": "NLP",
  "Cyber Security": "Cyber",
  "Network Security": "Cyber",
  Computer: "PC",
  "Information Technology": "IT",
  Software: "SW",
  "Consumer Software": "SW",
  "Web Development": "WebDev",
  "Online Portals": "Portals",
  "Web Apps": "Web",
  "Mobile Apps": "Mobile",
  "Enterprise Software": "Enterprise",
  "Document Management": "DocMg",
  "Developer Tools": "Dev Tools",
  "Productivity Tools": "Prod Tools",
  "Developer Platform": "Dev Plat",
  "Developer APIs": "API",
  "Cloud Computing": "Cloud",
  "Cloud Management": "Cloud",
  "Cloud Data Services": "CloudData",
  "Cloud Infrastructure": "Cloud",
  "Cloud Security": "Cloud",
  "Big Data": "BD",
  "Data Integration": "Data",
  "Data Management": "Data",
  "Data Visualization": "Data Vis",
  "Business Intelligence": "BI",
  Finance: "Fin",
  "Financial Services": "Fin",
  "Decentralized Finance (DeFi)": "DeFi",
  Ethereum: "ETH",
  Cryptocurrency: "Crypto",
  "Asset Management": "AssetMg",
  "Real Estate": "PropTech",
  "Rental Property": "Rental",
  "Health Care": "Health",
  "Health Diagnostics": "Health",
  "Primary and Urgent Care": "PrimCare",
  "Medical Device": "MedDevice",
  "Clinical Trials": "Medical",
  "Home Health Care": "HomeCare",
  "Mental Health": "Mental",
  "Personal Health": "Health",
  "E-Commerce": "eCom",
  "3D Technology": "3D",
  "Graphic Design": "GraphDes",
  "A/B Testing": "A/B",
  "Virtual Reality": "VR",
  Biotechnology: "BioTech",
  "Creative Agency": "Creative",
  "Online Games": "Online",
  "PC Games": "PC",
  "Video Games": "Gaming",
  "Social Network": "RRSS",
  "Film Production": "Film",
  "Media and Entertainment": "Media",
};
