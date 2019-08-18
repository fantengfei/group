const initAudio = (then) => {
    const getAudioData = (success) => {
        wx.downloadFile({
            url: "http://lc-lcen5rxb.cn-n1.lcfile.com/a0f495c2ae45059539fa/heart.mp3",
            success(res) {
                if (res.statusCode != 200) {
                    success(false)
                    return
                }
                wx.saveFile({
                    tempFilePath: res.tempFilePath,
                    success(res) {
                        wx.setStorage({
                            key: 'heart_audio',
                            data: res.savedFilePath,
                            success: () => {
                                success(true)
                            }
                        })
                    },
                    fail: () => {
                        success(false)
                    }
                })
            }
        })
    }

    const init = (callback) => {
        wx.getStorage({
            key: 'heart_audio',
            success: res => {
                // console.log(res)
                callback(true)
            },
            fail: () => {
                getAudioData((success) => {
                    callback(success)
                })
            }
        })
    }

    init((callback) => {
        if (callback) {
            const audio = wx.createInnerAudioContext()
            audio.src = wx.getStorageSync('heart_audio')
            audio.loop = false
            then(audio)
            return
        }
        then(null)
    })
}

module.exports = {
    initAudio: initAudio
}