import PropTypes from 'prop-types';
import { useState } from 'react';

import { LoginModal } from './LoginModal';
import WelcomeModal from './WelcomeModal';
import OnboardingModal from './OnboardingModal';

import { useBoolean } from 'hooks/useBoolean';

export function LoginModals({ isLoginModalOpen, closeLoginModal }) {
  const [
    isWelcomeModalOpen,
    openWelcomeModal,
    closeWelcomeModal,
  ] = useBoolean();
  const [
    isOnboardingModalOpen,
    openOnboardingModal,
    closeOnboardingModal,
  ] = useBoolean();
  const [userId, setUserId] = useState('');

  return (
    <>
      <LoginModal isOpen={isLoginModalOpen} onDismiss={handleFinishLogin} />
      {isWelcomeModalOpen && (
        <WelcomeModal userId={userId} onDismiss={closeWelcomeModal} />
      )}
      {isOnboardingModalOpen && (
        <OnboardingModal userId={userId} onDismiss={handleFinishOnboarding} />
      )}
    </>
  );

  function handleFinishLogin(user) {
    closeLoginModal();
    setUserId(user.id);
    if (user.finishedOnboarding) {
      openWelcomeModal();
      return;
    }
    openOnboardingModal();
  }

  function handleFinishOnboarding() {
    closeOnboardingModal();
    openWelcomeModal();
  }
}

LoginModals.propTypes = {
  isLoginModalOpen: PropTypes.bool.isRequired,
  closeLoginModal: PropTypes.func.isRequired,
};
