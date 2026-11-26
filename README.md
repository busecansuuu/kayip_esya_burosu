# Kayıp Eşya Bürosu: Minik Şehir (Flutter)

Sevimli bir 3D sınıflandırma ve tamir oyunu. Uygulama Flutter ile yazıldı. 3D oyun `assets/game/index.html` içinde, internet gerektirmeden bir WebView'da çalışıyor. Reklamlar (AdMob), titreşim ve kayıt Flutter tarafında yapılıyor.

## Klasör yapısı

```
lib/
  main.dart          uygulama girişi, dikey ekran, AdMob başlatma
  game_screen.dart   oyunu WebView'da açar, oyunla JavaScript köprüsü
  ads.dart           ödüllü ve geçiş reklamları (şu an TEST kimlikleri)
assets/game/
  index.html         3D oyunun tamamı (Three.js dahil, tek dosya)
tool/
  setup.dart         Android ve iOS ayarlarını otomatik yapan betik
oyun_kaynak/         oyunun düzenlenebilir kaynak kodu (aşağıya bak)
```

## Kurulum

Gerekenler: **Flutter 3.38 veya üstü**, Android için Android Studio, iOS için Mac ve Xcode.

Bu klasörde terminal açıp sırayla çalıştır:

```bash
# 1. Android ve iOS klasörlerini oluştur (mevcut dosyalara dokunmaz)
flutter create --org com.seninadin --platforms=android,ios .

# 2. Paketleri indir
flutter pub get

# 3. AdMob ve WebView ayarlarını yap
dart run tool/setup.dart

# 4. Telefonda ya da emülatörde çalıştır
flutter run
```

`com.seninadin` yerine kendi alan adını ters sırayla yaz (örneğin `com.ahmetoyun`). Bu değer uygulamanın mağazadaki kimliği olur ve sonradan değiştirmek zordur.

Paket sürümlerinde uyuşmazlık hatası alırsan `flutter pub upgrade --major-versions` komutunu çalıştır.

## Yayından önce yapılması gerekenler

1. **AdMob hesabı aç**, uygulamanı ekle ve iki reklam birimi oluştur: bir *Ödüllü*, bir *Geçiş*.
2. `lib/ads.dart` içindeki test reklam kimliklerini kendi kimliklerinle değiştir.
3. Uygulama kimliğini (`~` işaretli olan) değiştir:
   - Android: `android/app/src/main/AndroidManifest.xml` içinde `com.google.android.gms.ads.APPLICATION_ID`
   - iOS: `ios/Runner/Info.plist` içinde `GADApplicationIdentifier`
4. Geliştirirken kendi gerçek reklamlarına **tıklama**. Test cihazını AdMob'a ekle ya da test kimliklerini kullan, yoksa hesabın kapatılabilir.
5. Avrupa'daki kullanıcılar için reklam izni (GDPR) gerekir. AdMob panelindeki *Gizlilik ve mesajlaşma* bölümünden bir izin mesajı oluşturup Google'ın UMP SDK'sını eklemen önerilir.
6. Google Play'de *Veri güvenliği* formunu doldur (reklam kimliği toplandığını belirt) ve sitende `app-ads.txt` dosyasını yayınla.

## Oyunla Flutter nasıl konuşuyor?

Oyun `AdBridge` adlı JavaScript kanalına JSON mesajları gönderir:

| Mesaj | Anlamı |
|---|---|
| `{"t":"ready"}` | Oyun açıldı. Flutter kaydı `window.onNativeReady(...)` ile geri yollar |
| `{"t":"save","d":"..."}` | İlerlemeyi kaydet (her günün başında) |
| `{"t":"rewarded","id":3}` | Ödüllü reklam göster. Sonuç `window.onAdResult(3, true/false)` ile döner |
| `{"t":"interstitial"}` | Gün sonunda geçiş reklamı (iki günde bir) |
| `{"t":"haptic","k":"light"}` | Titreşim (`light` ya da `heavy`) |

Uygulama arka plana geçince oyunun saati durur. Android geri tuşu önce açık masayı kapatır, sonra uygulamadan çıkar.

## Oyunu değiştirmek

`oyun_kaynak/` klasöründe oyunun okunabilir kodu var:

- `src/game.js`: oyun mantığı, 3D modeller, zorluk ayarları
- `src/head.html`, `src/body.html`: görünüm ve arayüz

Değişiklikten sonra:

```bash
cd oyun_kaynak
npm install
node build.mjs
cp dist/index.html ../assets/game/index.html
```

Sık değiştirilecek ayarlar `src/game.js` içinde:

- `CATS`: rafların açıldığı günler (`d`)
- `TYPES`: eşya türleri
- `SHOP`: dükkân fiyatları
- `startDay`: sabah süresi (`S.rate`) ve gün başına eşya sayısı
- `startCustomers`: müşteri sabrı (`S.patT`) ve sahtekâr müşteri sayısı

Oyunu tarayıcıda denemek için `dist/index.html` dosyasını açman yeterli. Tarayıcıda reklamlar 3 saniyelik bir taklit ekranla gösterilir.

## Bilinen sınırlar

- Proje Flutter SDK olmayan bir ortamda yazıldı ve **henüz derlenmedi**. İlk `flutter run` sırasında küçük bir derleme hatası çıkarsa hata mesajıyla birlikte bana yazabilirsin.
- 3D sahne telefonun WebView'ında WebGL ile çiziliyor. Son 4–5 yılın telefonlarında akıcı olması beklenir, çok eski cihazlarda yavaşlayabilir.
