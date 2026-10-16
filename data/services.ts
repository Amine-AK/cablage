import { HomeService } from "@/types";

export const HOME_SERVICES: HomeService[] = [
  {
    id: "cctv-ip-installation",
    title: "Vidéosurveillance & Caméras IP",
    subtitle: "Vente, Installation & Paramétrage complet chez vous",
    description: "Installation de caméras analogiques HD et caméras IP haute résolution. Câblage invisible et esthétique, fixation sécurisée, et configuration de l'application mobile sur tous vos téléphones et tablettes pour voir votre maison en direct où que vous soyez.",
    iconName: "ShieldCheck",
    tag: "Sécurité 24/7",
    features: [
      "Pose intérieure et extérieure (résistance pluie & soleil IP67)",
      "Configuration Cloud P2P sur smartphone (DMSS, XMEye, Hik-Connect)",
      "Vision nocturne infrarouge et couleur (Smart Dual Light)",
      "Détection humaine & alertes instantanées sur smartphone",
      "Formation et explications complètes sur l'utilisation du système",
    ],
  },
  {
    id: "wifi-networking-sharing",
    title: "Réseaux & Partage Wi-Fi",
    subtitle: "Finies les coupures et zones sans signal dans votre maison",
    description: "Amélioration et extension de votre couverture internet partout dans la maison, villa à étages, jardin ou commerce. Installation de répéteurs Wi-Fi Mesh, routeurs puissants, points d'accès plafonniers et tirage de câbles réseau RJ45 Cat6.",
    iconName: "Wifi",
    tag: "Débit Maximal",
    features: [
      "Suppression des zones mortes (sous-sol, étages, terrasse, jardin)",
      "Installation de systèmes Wi-Fi Mesh sans perte de vitesse",
      "Tirage de câbles Ethernet RJ45 Cat6 haute vitesse pour TV & PC",
      "Configuration et sécurisation de votre réseau Wi-Fi invité/privé",
      "Partage et optimisation de la connexion Fibre Optique Maroc Telecom, Inwi, Orange",
    ],
  },
  {
    id: "electronics-repair",
    title: "Réparation Électronique à Domicile",
    subtitle: "Diagnostic et dépannage technique directement sur place",
    description: "Dépannage rapide de vos équipements électroniques et de sécurité : alimentations électriques 12V défaillantes, enregistreurs DVR/NVR qui bipent ou ne démarrent plus, connectique arrachée, caméras en panne et matériel informatique.",
    iconName: "Wrench",
    tag: "Intervention Rapide",
    features: [
      "Remplacement des alimentations et adaptateurs brûlés ou faibles",
      "Réparation des fiches BNC, connecteurs DC et prises RJ45",
      "Diagnostic et remplacement de disques durs de surveillance défectueux",
      "Remise en marche et réinitialisation de mots de passe DVR/XVR oubliés",
      "Dépannage électronique sur place sans déplacer tout votre matériel",
    ],
  },
];

export const SERVICE_AREAS = [
  {
    city: "Ain Aouda",
    desc: "Centre, Quartier Ennasr, Zone Villa, Al Amal et environs",
    badge: "Base locale",
  },
  {
    city: "Rabat",
    desc: "Agdal, Souissi, Hay Riad, Hassan, Yacoub El Mansour, Aviation",
    badge: "Intervention 7j/7",
  },
  {
    city: "Témara",
    desc: "Harhoura, Wifaq, Massira, Fouarat, Sidi Al Abed, Val d'Or",
    badge: "Intervention 7j/7",
  },
  {
    city: "Salé",
    desc: "Bettana, Tabriquet, Sala Al Jadida, Bab Lamrissa, Said Hajji",
    badge: "Intervention 7j/7",
  },
];
