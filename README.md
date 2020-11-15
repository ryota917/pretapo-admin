# pretapo-admin
pretapoの管理ツールです。  
詳細については[管理モバイルアプリ](https://www.notion.so/9e6cbc14da6a4f959dfafcd421079264)を参照。  


## expoについて

当アプリは、`expo eject` されている。
`expo eject`及び実行方法については以下を参照。

[React Native + Expoで1年以上運用したCTOが集まってみた 前編](https://tech.kitchhike.com/entry/react-native-expo-session-01)  
[React Native+ExpoのプロジェクトをejectしてiOS/Androidで起動するまで](https://www.aruse.net/entry/2019/09/01/122540)


## 起動

```
$ git clone git@github.com:ryota917/pretapo-admin.git
$ cd pretapo-admin
$ cd ios
$ pod install
$ cd ..
$ react-native start # ログが流れる
# 別のタブで
react-native run-ios # シミュレーターが立ち上がる
```

## トラブルシューティング

以下が参考になるかもしれない。  
詰まったら田川までご連絡ください。  

[can’t find gem cocoapods (>= 0.a) with executable pod (Gem::GemNotFoundException)](https://csiandal.medium.com/cant-find-gem-cocoapods-0-a-with-executable-pod-gem-gemnotfoundexception-94aa6dc8b630)  
[React Native「No bundle URL present」エラー対策集](https://qiita.com/wktq/items/9139f4c0bdf52bd71c93)  
[操作ログ](https://pretapo.slack.com/archives/C01EXJ24PCL/p1605418387000700)  
