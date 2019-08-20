const initAudio = (then) => {
    const getAudioData = (src) => {
        wx.downloadFile({
            url: "http://lc-lcen5rxb.cn-n1.lcfile.com/a0f495c2ae45059539fa/heart.mp3",
            success(res) {
                if (res.statusCode != 200) {
                    src(null)
                    return
                }
                wx.saveFile({
                    tempFilePath: res.tempFilePath,
                    success(res) {
                        wx.setStorage({
                            key: 'heart_audio',
                            data: res.savedFilePath,
                            success: () => {
                                src(res.savedFilePath)
                            }
                        })
                    },
                    fail: () => {
                        src(null)
                    }
                })
            },
            fail() {
                src(null)
            }
        })
    }

    const init = (callback) => {
        wx.getStorage({
            key: 'heart_audio',
            success: res => {
                callback(res.data)
            },
            fail: () => {
                getAudioData((src) => {
                    callback(src)
                })
            }
        })
    }

    init((src) => {
        const audio = wx.createInnerAudioContext()
        audio.src = src
        then(audio)
    })
}

module.exports = {
    initAudio: initAudio
}