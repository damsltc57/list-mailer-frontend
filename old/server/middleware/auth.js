export const auth = (req, res, next) => {
  try {
    next();
  } catch (error) {
    console.log('header admin authentification required', error);
    res.status(401).json({ message: 'header admin authentification required' });
  }
};
