import React, { useEffect } from "https://esm.sh/react@17.0.2";
import styled from "https://esm.sh/styled-components@5.3.0";
import confetti from "https://cdn.skypack.dev/canvas-confetti@1.4.0";
import addMinutes from "https://deno.land/x/date_fns@v2.15.0/addMinutes/index.js";
import formatDistanceToNow from "https://deno.land/x/date_fns@v2.15.0/formatDistanceToNow/index.js";

import CommonHeader from "./CommonHeader.ts";
import { useStoreState } from "../state/index.ts";
import config from "../back/config/config.ts";
import { computeStats } from "../back/common/data.ts";

const StatusContainer = styled.div`
  margin: auto;
  margin-bottom: 70px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 900px;
`;

const StatusText = styled(CommonHeader)`
  font-size: 44px;
  text-align: center;
  margin-bottom: 2px;
`;

const StatusDescription = styled(CommonHeader)`
  text-align: center;
`;

const Video = styled.video`
  display: block;
  max-width: 100%;
  margin: 12px 0;
`;

const CountdownHeader = styled(CommonHeader)`
  font-size: 28px;
  text-align: center;
  margin-bottom: 0;
`;

const Countdown = styled(CommonHeader)`
  font-size: 58px;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 10px;
  color: ${(props) => props.theme.activationCountdown.countdownTimeColor};
`;

const CountdownBlocks = styled(CommonHeader)`
  font-size: 18px;
  text-align: center;
  margin-bottom: 50px;
`;

function randomInRange(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function showConfetti() {
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
}

export default function LockedIn() {
  const blocks = useStoreState((store) => store.blocks);
  const forkName = config.fork.name;
  let status = config.fork.status;
  const { lockedIn } = computeStats(blocks);

  useEffect(() => {
    if (config.fork.showCelebrationConfetti) {
      showConfetti();
    }
  }, []);

  const currentBlockheight = (blocks.find((block) => block.signals === undefined)?.height ?? 0) - 1;

  if (currentBlockheight >= config.fork.activationHeight) {
    // Just hack this one until we utilize `bitcoin-cli getblockchainfo`
    // instead of hardcoding the status in the config file
    status = "active";
  }

  const showActivationCountdown = config.fork.showActivationCountdown && status !== "active";

  return (
    <StatusContainer>
      {!showActivationCountdown && (
        <>
          <StatusText>
            {(status === "locked_in" || (lockedIn && status !== "active")) && <>LOCKED IN!</>}
            {status === "active" && <>ACTIVE!</>}
          </StatusText>
          <StatusDescription>
            {lockedIn && status === "started" && (
              <>
                This period has reached {config.fork.threshold} {forkName} signalling blocks, which is required for
                lock-in.
              </>
            )}
            {status === "locked_in" && <>{forkName} has been locked in!</>}
            {status === "active" && <>{forkName} softfork has been activated!</>}
          </StatusDescription>
        </>
      )}
      {showActivationCountdown && (
        <>
          <CountdownHeader>TAPROOT ACTIVATES IN</CountdownHeader>
          <Countdown>
            {formatDistanceToNow(addMinutes(new Date(), (config.fork.activationHeight - currentBlockheight) * 10), {})}
          </Countdown>
          <CountdownBlocks>{config.fork.activationHeight - currentBlockheight} blocks left</CountdownBlocks>
        </>
      )}
      {config.frontend.celebrate && <Video src={config.frontend.celebrate.url} controls />}
    </StatusContainer>
  );
}
