export const Footer = () => {
  return (
    <footer className="bg-light border-top py-4 mt-5">
      <div className="container text-center text-muted">
        <p className="mb-0 small">
          &copy; {new Date().getFullYear()} Institución Universitaria. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
};