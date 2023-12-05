import { View, TouchableOpacity } from 'react-native'
import React, { useState, useRef } from 'react'
import { Camera, CameraRecordingQuality, useCameraDevice } from 'react-native-vision-camera'

const CustomCamera = () => {

    const cameraRef = useRef(null)
    const [isRecording, setIsRecording] = useState(false)

    const takePicture = async () => {
        if (cameraRef.current) {
            const photo = await cameraRef.current.takePhoto({
                quality: 'high'
            })
            await CameraRoll.save(`file://${photo.path}`, {
                type: 'photo',
            })
            console.log(photo)
        }
    }
    const toggleRecording = async () => {
        if (isRecording) {
            await cameraRef.current.stopRecording()
        } else {
            const video = await cameraRef.current.record({
                quality: CameraRecordingQuality['720p'],
                onRecordingFinished: async (video) => {
                    const path = video.path
                    await CameraRoll.save(`file://${path}`, {
                      type: 'video',
                    })
                  }
            })
            console.log(video)
        }
        setIsRecording(!isRecording)
    }
    const device = useCameraDevice('back')

    return (
        <View style={{ flex: 1 }}>
            <Camera
                ref={cameraRef}
                video={true}
                photo={true}
                device={device}
                ratio='16:10'
                style={{ flex: 1 }}
            />
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: 'grey' }}>
                <TouchableOpacity
                    onPress={takePicture}
                    style={{
                        width: 50, height: 50, borderRadius: 25,
                        backgroundColor: 'white', margin: 10
                    }}
                />
                <TouchableOpacity
                    onPress={toggleRecording}
                    style={{
                        width: 50, height: 50,
                        borderRadius: isRecording ? 0 : 25,
                        backgroundColor: 'red', margin: 10
                    }}
                />
            </View>
        </View>
    )
}

export default CustomCamera