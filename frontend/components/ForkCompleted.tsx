import React, { useEffect } from "https://esm.sh/react@17.0.2";
import styled from "https://esm.sh/styled-components@5.3.0";
import confetti from "https://cdn.skypack.dev/canvas-confetti@1.4.0";

import CommonHeader from "./CommonHeader.ts";
import { useStoreState } from "../state/index.ts";
import config from "../back/config/config.ts";
import { computeStats } from "../back/common/data.ts";

const LockedInContainer = styled.div`
  margin: auto;
  margin-bottom: 70px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 900px;
`;

const LockedInText = styled(CommonHeader)`
  font-size: 44px;
  text-align: center;
  margin-bottom: 2px;
`;

const LockedInDescription = styled(CommonHeader)`
  text-align: center;
`;

const Video = styled.video`
  display: block;
  max-width: 100%;
  margin: 12px 0;
`;

function randomInRange(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export default function LockedIn() {
  const blocks = useStoreState((store) => store.blocks);
  const forkName = config.fork.name;
  const status = config.fork.status;
  const { lockedIn } = computeStats(blocks);

  useEffect(() => {
    const duration = 4 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 60 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.35), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.65, 0.9), y: Math.random() - 0.2 } });
    }, 250);
  }, []);

  return (
    <LockedInContainer>
      <LockedInText>
        {(status === "locked_in" || (lockedIn && status !== "active")) && <>LOCKED IN!</>}
        {status === "active" && <>ACTIVE!</>}
      </LockedInText>
      <LockedInDescription>
        {lockedIn && status === "started" && (
          <>
            This period has reached {config.fork.threshold} {forkName} signalling blocks, which is required for lock-in.
          </>
        )}
        {status === "locked_in" && <>{forkName} has been locked in!</>}
        {status === "active" && <>{forkName} softfork has been activated!</>}
      </LockedInDescription>
      {config.frontend.celebrate && <Video src={config.frontend.celebrate.url} controls autoPlay />}
    </LockedInContainer>
  );
}
