import {
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

import TextInputContainer from '../components/TextInputContainer/TextInputContainer';

export const JoinScreen = ({
  setType,
  otherUserId,
  callerId,
  peerConnection,
  socket,
}: any) => {
  function sendCall(data: any) {
    socket.emit('call', data);
  }

  async function processCall() {
    // 1. Alice runs the `createOffer` method for getting SDP.
    const sessionDescription = await peerConnection.current.createOffer({
      OfferToReceiveAudio: true,
      OfferToReceiveVideo: true,
      VoiceActivityDetection: true,
    });

    // 2. Alice sets the local description using `setLocalDescription`.
    await peerConnection.current.setLocalDescription(sessionDescription);

    // 3. Send this session description to Bob uisng socket
    sendCall({
      calleeId: otherUserId.current,
      rtcMessage: sessionDescription,
    });
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{
        flex: 1,
        backgroundColor: '#050A0E',
        justifyContent: 'center',
        paddingHorizontal: 42,
      }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <>
          <View
            style={{
              padding: 35,
              backgroundColor: '#1A1C22',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 14,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                color: '#D0D4DD',
              }}
            >
              Your Caller ID
            </Text>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 12,
                alignItems: 'center',
              }}
            >
              <Text
                style={{
                  fontSize: 32,
                  color: '#ffff',
                  letterSpacing: 6,
                }}
              >
                {callerId}
              </Text>
            </View>
          </View>

          <View
            style={{
              backgroundColor: '#1A1C22',
              padding: 40,
              marginTop: 25,
              justifyContent: 'center',
              borderRadius: 14,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                color: '#D0D4DD',
              }}
            >
              Enter call id of another user
            </Text>
            <TextInputContainer
              placeholder={'Enter Caller ID'}
              value={otherUserId.current}
              setValue={(text: any) => {
                otherUserId.current = text;
              }}
              keyboardType={'number-pad'}
            />
            <TouchableOpacity
              onPress={() => {
                processCall();
                setType('OUTGOING_CALL');
              }}
              style={{
                height: 50,
                backgroundColor: '#5568FE',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 12,
                marginTop: 16,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: '#FFFFFF',
                }}
              >
                Call Now
              </Text>
            </TouchableOpacity>
          </View>
        </>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
