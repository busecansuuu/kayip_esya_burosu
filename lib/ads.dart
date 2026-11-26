import 'dart:async';
import 'dart:io';

import 'package:google_mobile_ads/google_mobile_ads.dart';

/// Reklam birimi kimlikleri.
///
/// ŞU AN GOOGLE'IN TEST KİMLİKLERİ KULLANILIYOR. Uygulamayı mağazaya
/// göndermeden önce AdMob panelinde kendi reklam birimlerini oluşturup
/// buradaki değerleri değiştir. Test kimlikleriyle yayına çıkan uygulama
/// para kazanmaz; geliştirirken kendi gerçek kimliğinle reklama tıklamak ise
/// AdMob hesabının kapatılmasına yol açabilir.
class AdIds {
  static String get rewarded => Platform.isAndroid
      ? 'ca-app-pub-3940256099942544/5224354917'
      : 'ca-app-pub-3940256099942544/1712485313';

  static String get interstitial => Platform.isAndroid
      ? 'ca-app-pub-3940256099942544/1033173712'
      : 'ca-app-pub-3940256099942544/4411468910';
}

/// Ödüllü ve geçiş reklamlarını önceden yükleyip gösteren küçük servis.
class AdService {
  RewardedAd? _rewarded;
  InterstitialAd? _interstitial;
  bool _loadingRewarded = false;
  bool _loadingInterstitial = false;
  Completer<void>? _rewardedWaiter;

  void preload() {
    _loadRewarded();
    _loadInterstitial();
  }

  void _loadRewarded() {
    if (_loadingRewarded || _rewarded != null) return;
    _loadingRewarded = true;
    RewardedAd.load(
      adUnitId: AdIds.rewarded,
      request: const AdRequest(),
      rewardedAdLoadCallback: RewardedAdLoadCallback(
        onAdLoaded: (ad) {
          _rewarded = ad;
          _loadingRewarded = false;
          _rewardedWaiter?.complete();
          _rewardedWaiter = null;
        },
        onAdFailedToLoad: (error) {
          _loadingRewarded = false;
          _rewardedWaiter?.complete();
          _rewardedWaiter = null;
        },
      ),
    );
  }

  void _loadInterstitial() {
    if (_loadingInterstitial || _interstitial != null) return;
    _loadingInterstitial = true;
    InterstitialAd.load(
      adUnitId: AdIds.interstitial,
      request: const AdRequest(),
      adLoadCallback: InterstitialAdLoadCallback(
        onAdLoaded: (ad) {
          _interstitial = ad;
          _loadingInterstitial = false;
        },
        onAdFailedToLoad: (error) {
          _loadingInterstitial = false;
        },
      ),
    );
  }

  /// Ödüllü reklamı gösterir. Oyuncu ödülü hak ettiyse `true` döner.
  /// Reklam hazır değilse en fazla 6 saniye yüklenmesini bekler.
  Future<bool> showRewarded() async {
    if (_rewarded == null) {
      _rewardedWaiter ??= Completer<void>();
      _loadRewarded();
      await _rewardedWaiter!.future
          .timeout(const Duration(seconds: 6), onTimeout: () {});
    }
    final ad = _rewarded;
    if (ad == null) return false;
    _rewarded = null;

    final done = Completer<bool>();
    var earned = false;
    ad.fullScreenContentCallback = FullScreenContentCallback(
      onAdDismissedFullScreenContent: (ad) {
        ad.dispose();
        if (!done.isCompleted) done.complete(earned);
        _loadRewarded();
      },
      onAdFailedToShowFullScreenContent: (ad, error) {
        ad.dispose();
        if (!done.isCompleted) done.complete(false);
        _loadRewarded();
      },
    );
    await ad.show(onUserEarnedReward: (ad, reward) => earned = true);
    return done.future;
  }

  /// Gün sonlarında araya giren geçiş reklamı. Hazır değilse sessizce atlanır.
  void showInterstitial() {
    final ad = _interstitial;
    if (ad == null) {
      _loadInterstitial();
      return;
    }
    _interstitial = null;
    ad.fullScreenContentCallback = FullScreenContentCallback(
      onAdDismissedFullScreenContent: (ad) {
        ad.dispose();
        _loadInterstitial();
      },
      onAdFailedToShowFullScreenContent: (ad, error) {
        ad.dispose();
        _loadInterstitial();
      },
    );
    ad.show();
  }

  void dispose() {
    _rewarded?.dispose();
    _interstitial?.dispose();
  }
}
