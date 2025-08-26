import React from 'react';
import Lottie from 'lottie-react';

interface LottieAnimationProps {
    animationData: any;
    loop?: boolean;
    width?: number;
    height?: number;
}
const LottieAnimation: React.FC<LottieAnimationProps> = ({
    animationData,
    loop=true,
    width=200,
    height=200

}) => {
    return (
    <div style={{ width, height }}>
      <Lottie animationData={animationData} loop={loop} />
    </div>
  );
}
export default LottieAnimation;