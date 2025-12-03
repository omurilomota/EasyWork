import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="app-footer">
      <div className="footer-content">
        <div className="footer-left">
          <div className="logo-small">🚀</div>
          <div className="footer-info">
            <div className="app-name">NexusTask Pro</div>
            <div className="app-version">v2.0.0 Premium</div>
          </div>
        </div>
        
        <div className="footer-center">
          <span className="footer-text">© 2024 NexusTask Pro. Todos os direitos reservados.</span>
        </div>
        
        <div className="footer-right">
          <a href="#" className="footer-link">Termos</a>
          <a href="#" className="footer-link">Privacidade</a>
          <a href="#" className="footer-link">Suporte</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
