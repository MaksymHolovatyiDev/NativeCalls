import { View, Text, TouchableOpacity } from 'react-native';

import { RTCSessionDescription } from 'react-native-webrtc';

import { CallAnswer } from '../assets';

export const IncomingCallScreen = ({
  setType,
  otherUserId,
  socket,
  peerConnection,
  remoteRTCMessage,
}: any) => {
  function answerCall(data: any) {
    socket.emit('answerCall', data);
  }

  async function processAccept() {
    // 4. Bob sets the description, Alice sent him as the remote description using `setRemoteDescription()`
    peerConnection.current.setRemoteDescription(
      new RTCSessionDescription(remoteRTCMessage.current)
    );

    // 5. Bob runs the `createAnswer` method
    const sessionDescription = await peerConnection.current.createAnswer();

    // 6. Bob sets that as the local description and sends it to Alice
    await peerConnection.current.setLocalDescription(sessionDescription);
    answerCall({
      callerId: otherUserId.current,
      rtcMessage: sessionDescription,
    });
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'space-around',
        backgroundColor: '#050A0E',
      }}
    >
      <View
        style={{
          padding: 35,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 14,
        }}
      >
        <Text
          style={{
            fontSize: 36,
            marginTop: 12,
            color: '#ffff',
          }}
        >
          {otherUserId.current} is calling..
        </Text>
      </View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <TouchableOpacity
          onPress={() => {
            processAccept();
            setType('WEBRTC_ROOM');
          }}
          style={{
            backgroundColor: 'green',
            borderRadius: 30,
            height: 60,
            aspectRatio: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CallAnswer height={28} fill={'#fff'} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
