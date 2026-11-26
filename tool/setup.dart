// Platform dosyalarını AdMob ve WebView için ayarlar.
//
// Kullanım (proje klasöründe, `flutter create .` komutundan SONRA):
//   dart run tool/setup.dart
//
// Yaptıkları:
//   * Android: İnternet izni, AdMob uygulama kimliği, minSdk 24
//   * iOS: GADApplicationIdentifier, SKAdNetwork kimliği, iOS 13 hedefi
// Komutu birden fazla çalıştırmak güvenlidir; zaten ekli olanı tekrar eklemez.
//
// NOT: Buradaki AdMob uygulama kimlikleri Google'ın TEST kimlikleridir.
// Yayından önce kendi kimliğinle değiştir (README'ye bak).
import 'dart:io';

const androidAppId = 'ca-app-pub-3940256099942544~3347511713';
const iosAppId = 'ca-app-pub-3940256099942544~1458002511';

void main() {
  var ok = true;
  ok &= _android();
  ok &= _gradle();
  ok &= _ios();
  ok &= _podfile();
  stdout.writeln(ok
      ? '\nTamam. Şimdi "flutter run" ile çalıştırabilirsin.'
      : '\nBazı dosyalar bulunamadı. Önce "flutter create ." çalıştırdın mı?');
}

bool _android() {
  final f = File('android/app/src/main/AndroidManifest.xml');
  if (!f.existsSync()) return _missing(f.path);
  var s = f.readAsStringSync();
  if (!s.contains('android.permission.INTERNET')) {
    s = s.replaceFirst('<application',
        '<uses-permission android:name="android.permission.INTERNET"/>\n    <application');
  }
  if (!s.contains('com.google.android.gms.ads.APPLICATION_ID')) {
    final start = s.indexOf('<application');
    final end = s.indexOf('>', start);
    s = '${s.substring(0, end + 1)}\n        <meta-data\n            android:name="com.google.android.gms.ads.APPLICATION_ID"\n            android:value="$androidAppId"/>${s.substring(end + 1)}';
  }
  f.writeAsStringSync(s);
  stdout.writeln('✓ AndroidManifest.xml');
  return true;
}

bool _gradle() {
  for (final path in ['android/app/build.gradle.kts', 'android/app/build.gradle']) {
    final f = File(path);
    if (!f.existsSync()) continue;
    var s = f.readAsStringSync();
    s = s
        .replaceAll(RegExp(r'minSdk\s*=\s*flutter\.minSdkVersion'), 'minSdk = 24')
        .replaceAll(RegExp(r'minSdkVersion\s+flutter\.minSdkVersion'), 'minSdkVersion 24');
    f.writeAsStringSync(s);
    stdout.writeln('✓ $path (minSdk 24)');
    return true;
  }
  return _missing('android/app/build.gradle(.kts)');
}

bool _ios() {
  final f = File('ios/Runner/Info.plist');
  if (!f.existsSync()) return _missing(f.path);
  var s = f.readAsStringSync();
  if (!s.contains('GADApplicationIdentifier')) {
    final i = s.lastIndexOf('</dict>');
    s = '${s.substring(0, i)}\t<key>GADApplicationIdentifier</key>\n\t<string>$iosAppId</string>\n'
        '\t<key>SKAdNetworkItems</key>\n\t<array>\n\t\t<dict>\n\t\t\t<key>SKAdNetworkIdentifier</key>\n\t\t\t<string>cstr6suwn9.skadnetwork</string>\n\t\t</dict>\n\t</array>\n'
        '${s.substring(i)}';
  }
  f.writeAsStringSync(s);
  stdout.writeln('✓ Info.plist');
  return true;
}

bool _podfile() {
  final f = File('ios/Podfile');
  if (!f.existsSync()) {
    stdout.writeln('• ios/Podfile henüz yok (ilk iOS derlemesinde oluşur, sonra komutu tekrar çalıştır).');
    return true;
  }
  var s = f.readAsStringSync();
  s = s.replaceFirst(RegExp(r"^#?\s*platform :ios, '[\d.]+'", multiLine: true), "platform :ios, '13.0'");
  f.writeAsStringSync(s);
  stdout.writeln('✓ Podfile (iOS 13)');
  return true;
}

bool _missing(String path) {
  stdout.writeln('✗ $path bulunamadı');
  return false;
}
