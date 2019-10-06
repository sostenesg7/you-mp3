/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
console.disableYellowBox = true;
import * as Progress from 'react-native-progress';
import React, {Component} from 'react';
import RNFetchBlob from 'rn-fetch-blob';
const android = RNFetchBlob.android;
import axios from 'axios';
import {PermissionsAndroid} from 'react-native';
import RNFS from 'react-native-fs';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Linking,
  Image,
  Dimensions,
  Clipboard,
  AppState,
} from 'react-native';
var SendIntentAndroid = require('react-native-send-intent');

const Screen = Dimensions.get('window');

class App extends Component {
  state = {
    progress: 0,
    url: undefined,
    appState: AppState.currentState,
  };
  /* 
  componentDidMount() {
    Linking.getInitialURL()
      .then(url => {
        //alert(JSON.stringify(url));
      })
      .catch(err => alert(JSON.stringify(err)));
  }  */

  componentDidMount() {
    Linking.addEventListener('url', this._handleOpenURL);

    Linking.getInitialURL().then(url => {
      if (url) {
        this._handleOpenURL({url});
      }
    });
    AppState.addEventListener('change', this._handleAppStateChange);

    Clipboard.getString().then(url => {
      if (url && url.indexOf('you') !== -1) {
        const key = this.getVideoId(url);
        this.setState({
          url: url,
          img: `https://img.youtube.com/vi/${key}/mqdefault.jpg`,
        });
      }
    });
  }
  /* 
  componentDidMount() {
    Linking.addEventListener('url', this._handleOpenURL);
  } */
  componentWillUnmount() {
    Linking.removeEventListener('url', this._handleOpenURL);
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  _handleOpenURL(event) {
    alert(event.url);
  }

  _handleAppStateChange = nextAppState => {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      Clipboard.getString().then(url => {
        if (url && url.indexOf('you') !== -1) {
          const key = this.getVideoId(url);
          this.setState({
            url: url,
            img: `https://img.youtube.com/vi/${key}/mqdefault.jpg`,
          });
        }
      });
    }
    this.setState({appState: nextAppState});
  };
  getVideoId = url => {
    try {
      const rx = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
      return url.match(rx)[1];
    } catch (e) {}
    return undefined;
  };

  backgroundDownload = data => {
    /* const config = {
      downloadTitle: data.title,
      downloadDescription: 'Baixando...',
      saveAsName: `${data.title}.mp3`,
      allowedInRoaming: true,
      allowedInMetered: true,
      showInDownloads: true,

      external: true, //when false basically means use the default Download path (version ^1.3)
      path: dirs.MusicDir,
    };
    this.setState({step: 'DOWNLOADING'});

    downloadManager
      .download(`http:${data.result}`, {}, config)
      .then(response => {
        this.setState({progress: 1, url: ''});
        this.setState({step: 'DOWNLOADED'});
        console.log('sucess');
      })
      .catch(error => {
        console.log(error);
        this.setState({step: 'ERROR'});
        alert(JSON.stringify(error));
        this.setState({progress: 0});
      });

    return; */

    RNFetchBlob.config({
      /*  addAndroidDownloads: {
        useDownloadManager: true,
        title: `${data.title}.mp3`,
        description: data.title,
        mime: 'audio/mpeg,;
        mediaScannable: true,
        notification: true,
        path: `${dirs.DownloadDir}/${data.title}.mp3`,
      }, */
    })
      .fetch('GET', `http:${data.result}`)
      .progress((received, total) => {
        console.log('progress', received / total);
        this.setState({progress: received / total});
        this.setState({step: 'DOWNLOADING'});
      })
      .then(() => {
        //  alert(JSON.stringify(resp));
        this.setState({progress: 1, url: '', img: undefined});
        this.setState({step: 'DOWNLOADED'});
        console.log('sucess');
      })
      .catch(error => {
        console.log(error);
        this.setState({step: 'ERROR'});
        alert(JSON.stringify(error));
        this.setState({progress: 0});
      });
  };

  download = (data, type) => {
    const fType = type === 'IMAGE' ? `${data.title}.jpg` : `${data.title}.mp3`;
    const path = `${RNFS.ExternalStorageDirectoryPath}/Downloads/${fType}`;

    //alert(JSON.stringify(data))

    let config = {
      path,
    };
    this.setState({step: 'DOWNLOADING'});
    if (type === 'BACKGROUND') {
      // alert('back');
      config = {
        addAndroidDownloads: {
          useDownloadManager: true,
          title: data.title,
          description: data.title,
          //mime: 'audio/mpeg',
          mime: '/',
          mediaScannable: true,
          notification: true,
          path, //: `${dirs.DownloadDir}/${data.title}.mp3`,
        },
      };
    }
    RNFetchBlob.config(config)
      .fetch('GET', `http:${data.result}`)
      .progress((received, total) => {
        console.log('progress', received / total);
        this.setState({progress: received / total});
        this.setState({step: 'DOWNLOADING'});
      })
      .then(resp => {
        console.log(resp);
        //alert(JSON.stringify(resp));
        // RNFetchBlob.android.actionViewIntent(resp.path(), '/');
        this.setState({
          progress: 1,
          url: '',
          step: undefined,
          path: resp.data,
          resp,
        });
        this.setState({step: 'DOWNLOADED'});
        console.log('sucess');
      })
      .catch(error => {
        console.log(error);
        this.setState({step: 'ERROR'});
        alert(JSON.stringify(error));
        this.setState({progress: 0});
      });

    /* RNBackgroundDownloader.download({
      id: `${new Date().getTime()}`,
      url: `http:${data.result}`,
      destination: `${dirs.DownloadDir}/${data.title}.mp3`,
    })
      .begin(expectedBytes => {
        this.setState({step: 'CONVERTING'});
      })
      .progress(progress => {
        this.setState({step: 'DOWNLOADING'});
        console.log(progress);
        this.setState({progress});
      })
      .done(resp => {
        this.setState({progress: 1, url: ''});
        this.setState({step: 'DOWNLOADED'});
        console.log('sucess');
        alert(JSON.stringify(resp));
      })
      .error(error => {
        console.log(error);
        this.setState({step: 'ERROR'});
        alert(JSON.stringify(error));
        this.setState({progress: 0});
      }); */
  };

  initDownload = type => {
    const stateUrl = this.state.url;
    if (stateUrl === '' || stateUrl === null || stateUrl === undefined) {
      alert('Link inválido');
      return;
    }

    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    ).then(permission => {
      if (permission !== PermissionsAndroid.RESULTS.GRANTED) {
        alert('Permissao de Armazenamento necessária');
        return;
      }

      const key = this.getVideoId(this.state.url);

      //SERVER: https://youtubetomp3.biz/
      //https://one.ovzy.xyz/dl_yt.php?link=https://www.youtube.com/watch?v=wXP2J77RezQ&format=mp3&color=37BEB2&text=fff&color=0087cf&text=fff

      const url = `https://one.ovzy.xyz/api.php?ftype=mp3&quality=192&url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DwXP2J77RezQ&vid=${key}&d=0&t=1568522403&c1=224f69dd56&c2=072832ab208d08b96efb29d7646ffbec&web=insertlink`;

      console.log(key);

      this.setState({step: 'LOADING'});

      this.request(url)
        .then(data => {
          data.key = key;
          data.img = `//img.youtube.com/vi/${key}/maxresdefault.jpg`;

          this.setState({img: data.img, step: 'CONVERTING', progress: 0});

          if (type === 'IMAGE') {
            data.result = data.img;
          }

          this.download(data, type);
        })
        .catch(error => {
          console.log(error);
          this.setState({step: 'ERROR'});
          alert(JSON.stringify(error));
          this.setState({progress: 0});
        });
      return;
    });
  };

  request = url =>
    new Promise((resolve, reject) => {
      axios
        .get(url, {
          headers: {
            'sec-fetch-mode': 'cors',
            cookie:
              '__cfduid=d00c2cecf8bc9cc3f18de39104419ef811568521411; PHPSESSID=2p6frfl3ggjpornob7ktt0j0tp; _ga=GA1.2.1543249220.1568521414; _gid=GA1.2.97282018.1568521414',
            dnt: 1,
            'accept-language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7',
            'user-agent':
              'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.132 Safari/537.36',
            accept: '*/*',
            referer:
              'https://one.ovzy.xyz/dl_yt.php?link=https://www.youtube.com/watch?v=jTjVSRONmlM&format=mp3&color=37BEB2&text=fff&color=0087cf&text=fff',
            authority: 'one.ovzy.xyz',
            'x-requested-with': 'XMLHttpRequest',
            'sec-fetch-site': 'same-origin',
          },
        })
        .then(({data}) => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });

  render() {
    let text = '';
    const t = Number(this.state.progress * 100).toFixed(0);
    switch (this.state.step) {
      case 'LOADING':
        text = `Buscando...`;
        break;
      case 'CONVERTING':
        text = `Convertendo...`;
        break;
      case 'DOWNLOADING':
        text = `Baixando...${t <= 0 ? '' : `${t}%`}`;
        break;
      case 'DOWNLOADED':
        text = `Salvo!${t}%`;
        break;
      case 'ERROR':
        text = `Erro!${t}%`;
        break;
      default:
        text = '0%';
    }

    return (
      <ScrollView
        automaticallyAdjustContentInsets={true}
        contentInsetAdjustmentBehavior={'automatic'}
        contentContainerStyle={{flexGrow: 1}}>
        <View
          style={{
            flex: 1,
            flexGrow: 1,
            justifyContent: 'space-between',
            padding: 10,
            backgroundColor: '#F9F9F9',
          }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'space-between',
              alignContent: 'center',
              alignItems: 'center',
              //backgroundColor: 'green',
            }}>
            <View style={{}}>
              <Image
                style={{
                  resizeMode: 'contain',
                  height: null,
                  width: '100%',
                  aspectRatio: 1.4,
                }}
                source={{
                  uri: this.state.img,
                }}
              />
              {this.state.url !== null &&
                this.state.url !== undefined &&
                this.state.url !== '' &&
                this.state.img !== undefined && (
                  <TouchableOpacity
                    style={{
                      height: 60,
                      backgroundColor: '#f43e2b',
                      justifyContent: 'center',
                      alignContent: 'center',
                      alignItems: 'center',
                      borderRadius: 10,
                      marginRight: 5,
                    }}
                    onPress={() => this.initDownload('IMAGE')}>
                    <Text
                      style={{
                        fontSize: 18,
                        color: '#FFF',
                        textAlign: 'center',
                      }}>
                      BAIXAR IMAGEM
                    </Text>
                  </TouchableOpacity>
                )}
            </View>
            {this.state.step && (
              <View
                style={{
                  //height: 170,
                  //width: 170,
                  //justifyContent: 'center',
                  //backgroundColor: 'red',
                  //flex: 1,
                  width: '100%',
                }}>
                <Progress.Bar
                  animated={true}
                  //height={10}
                  width={Screen.width - 20}
                  progress={this.state.progress}
                  color={'#f43e2b'}
                  showsText={true}
                  indeterminate={
                    this.state.step === 'LOADING' ||
                    this.state.step === 'CONVERTING' ||
                    (this.state.step === 'DOWNLOADING' &&
                      this.state.progress <= 0)
                  }
                  /* textStyle={{
                fontSize: 40,
                textAlign: 'center',
              }}
              formatText={t => {}} */
                />
                <Text
                  style={{
                    //position: 'absolute',
                    color: '#f43e2b',
                    //alignSelf: 'center',
                    textAlign: 'center',
                    fontSize: 22,
                    marginTop: 10,
                    //    top: '50%',
                  }}>
                  {text}
                </Text>
              </View>
            )}
          </View>
          <View
            style={{
              marginTop: 20,
            }}>
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                flex: 1,
                //   backgroundColor: 'green',
              }}>
              <TextInput
                autoFocus={false}
                selectTextOnFocus={true}
                placeholder={'URL'}
                value={this.state.url}
                onChangeText={url => {
                  this.setState({url});
                  if (url && url.indexOf('you') !== -1) {
                    const key = this.getVideoId(url);
                    this.setState({
                      img: `https://img.youtube.com/vi/${key}/mqdefault.jpg`,
                    });
                  }
                }}
                style={{
                  borderBottomColor: '#515151',
                  borderBottomWidth: 1,
                  flex: 1,
                }}
              />
              <TouchableOpacity
                style={{
                  height: 60,
                  marginTop: 10,
                  backgroundColor: '#f43e2b',
                  justifyContent: 'center',
                  alignContent: 'center',
                  alignItems: 'center',
                  borderRadius: 10,
                  marginLeft: 10,
                  paddingHorizontal: 10,
                }}
                onPress={() => {
                  Clipboard.getString().then(url => {
                    if (url && url.indexOf('you') !== -1) {
                      const key = this.getVideoId(url);
                      this.setState({
                        url: url,
                        img: `https://img.youtube.com/vi/${key}/mqdefault.jpg`,
                      });
                    }
                  });
                }}>
                <Text
                  style={{
                    fontSize: 18,
                    color: '#FFF',
                    textAlign: 'center',
                  }}>
                  COLAR
                </Text>
              </TouchableOpacity>
            </View>
            {this.state.url !== '' &&
              this.state.url !== null &&
              this.state.url !== undefined &&
              this.state.url.indexOf('you') !== -1 && (
                <View
                  style={{
                    flexDirection: 'row',
                  }}>
                  <TouchableOpacity
                    style={{
                      height: 60,
                      marginTop: 10,
                      backgroundColor: '#f43e2b',
                      justifyContent: 'center',
                      alignContent: 'center',
                      alignItems: 'center',
                      borderRadius: 10,
                      flex: 1,
                      marginRight: 5,
                    }}
                    onPress={() => this.initDownload('FOREGROUND')}>
                    <Text
                      style={{
                        fontSize: 18,
                        color: '#FFF',
                        textAlign: 'center',
                      }}>
                      BAIXAR MP3
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{
                      flex: 1,
                      marginLeft: 5,
                      height: 60,
                      marginTop: 10,
                      backgroundColor: '#f43e2b',
                      justifyContent: 'center',
                      alignContent: 'center',
                      alignItems: 'center',
                      borderRadius: 10,
                    }}
                    onPress={() => this.initDownload('BACKGROUND')}>
                    <Text
                      style={{
                        fontSize: 18,
                        color: '#FFF',
                        textAlign: 'center',
                      }}>
                      {`BAIXAR MP3\n(EM BACKGROUND)`}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            {/* (this.state.path && this.state.step === 'DOWNLOADED') || */
            false && (
              <TouchableOpacity
                style={{
                  height: 60,
                  marginTop: 10,
                  backgroundColor: '#0c64d4',
                  justifyContent: 'center',
                  alignContent: 'center',
                  alignItems: 'center',
                  borderRadius: 10,
                }}
                onPress={() => {
                  //alert(JSON.stringify(this.state.resp.path()));

                  //  alert(this.state.resp.path());

                  /*   Linking.openURL(
                    `file:\\\/storage/emulated/0/downloads/1.mp3`,
                  ); */

                  SendIntentAndroid.openFileChooser(
                    {
                      subject: 'File subject', //optional,

                      fileUrl: '/storage/emulated/0/download/crop.jpeg',
                      type: 'image/jpeg',
                    },
                    'Open file with:',
                  );

                  /* 

                  SendIntentAndroid.sendText({
                    title: 'Please share this text',
                    text:
                      'Lorem ipsum dolor sit amet, per error erant eu, antiopam intellegebat ne sed',
                    type: SendIntentAndroid.TEXT_PLAIN,
                  }); */

                  return;
                  android.actionViewIntent(this.state.resp.path(), '*/*');
                  /* Share.open({
                      url: this.state.resp.path(),
                      type: 'audio/mpeg',
                    })
                      .then(res => {
                        console.log(res);
                      })
                      .catch(err => {
                        err && console.log(err);
                      }); */
                  /*  Linking.canOpenURL('file://').then(r => {
                    alert(JSON.stringify(r));
                  });

                  Linking.openURL(this.state.path).catch(err =>
                    alert(JSON.stringify(err)),
                  ); */
                }}>
                <Text
                  style={{
                    fontSize: 18,
                    color: '#FFF',
                  }}>
                  ABRIR
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default App;
