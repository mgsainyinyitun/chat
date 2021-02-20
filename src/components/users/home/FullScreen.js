import React, {useCallback} from 'react';
import { FullScreen, useFullScreenHandle } from "react-full-screen";

function MyFullScreen(props) {
  const handle = useFullScreenHandle();
  return (
    <div>
      <button onClick={handle.enter}>
        Enter fullscreen
      </button>

      <FullScreen handle={handle}>
        {props.children}
      </FullScreen>
    </div>
  );
}

export default MyFullScreen;