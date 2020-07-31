import React, { useEffect, useState, ReactElement } from 'react';
import cn from 'classnames';

type TParams = { limit: number };

const BackOnTop = ({ limit }: TParams): ReactElement => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = (): void => {
      if (window.pageYOffset > limit) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return (): void => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = (): void => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  const classButton = cn({
    'back-on-top': true,
    'button-hide': !scrolled,
  });

  return (
    <div className={classButton} onClick={() => scrollToTop()}>
      <img alt="Back on top" src="/images/up-arrow.svg" />
    </div>
  );
};

export default BackOnTop;
