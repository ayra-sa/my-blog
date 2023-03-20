const Footer = () => {
  const d = new Date();

  return (
    <footer className="text-center py-8 italic border-t border-t-neutral-300">
      <p>Arya Blog: {d.getFullYear()}</p>
    </footer>
  );
};

export default Footer;
