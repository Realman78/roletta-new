import React from 'react'

function MicButton() {
  const [micEnabled, setMicEnabled] = useState(true)

  const handleToggleMic = ({localStream}) => {
    localStream.getAudioTracks()[0].enabled = !micEnabled
    setMicEnabled(!micEnabled)
  }

  return (
    <div>MicButton</div>
  )
}

export default MicButton