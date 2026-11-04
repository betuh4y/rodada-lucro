/* Ajusta o projeto Android gerado pelo Capacitor:
   permissões de localização em segundo plano e nome do canal de notificação. */
const fs = require("fs");
const path = require("path");

const manifest = path.join("android", "app", "src", "main", "AndroidManifest.xml");
let xml = fs.readFileSync(manifest, "utf8");
const perms = [
  "android.permission.ACCESS_COARSE_LOCATION",
  "android.permission.ACCESS_FINE_LOCATION",
  "android.permission.FOREGROUND_SERVICE",
  "android.permission.FOREGROUND_SERVICE_LOCATION",
  "android.permission.POST_NOTIFICATIONS",
  "android.permission.WAKE_LOCK"
];
let add = "";
for (const p of perms) if (!xml.includes(p)) add += `    <uses-permission android:name="${p}" />\n`;
if (!xml.includes("android.hardware.location.gps"))
  add += `    <uses-feature android:name="android.hardware.location.gps" android:required="false" />\n`;
xml = xml.replace("<application", add + "\n    <application");
fs.writeFileSync(manifest, xml);
console.log("AndroidManifest.xml: permissões adicionadas");

const strings = path.join("android", "app", "src", "main", "res", "values", "strings.xml");
let st = fs.readFileSync(strings, "utf8");
if (!st.includes("capacitor_background_geolocation_notification_channel_name")) {
  st = st.replace("</resources>",
    '    <string name="capacitor_background_geolocation_notification_channel_name">Jornada (GPS)</string>\n</resources>');
  fs.writeFileSync(strings, st);
  console.log("strings.xml: canal de notificação configurado");
}
