export const validateApplicant = (req, res, next) => {
    const { name, email, contact } = req.body;
    const file = req.file; // Assuming you're using multer for file upload
    
    // Check if name is provided and is a valid string
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return res.status(400).send("Name is not valid");
    }
  
    // Check if email is provided and is a valid email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return res.status(400).send("Email is not valid");
    }
  
    // Check if contact is provided and is a valid phone number (basic validation for digits only)
    const contactRegex = /^[0-9]{10}$/;
    if (!contact || !contactRegex.test(contact)) {
      return res.status(400).send("Contact is not valid. It should be a 10-digit number.");
    }
  
    // Optional: Check if a file is uploaded (if required)
    if (!file) {
      return res.status(400).send("Resume file is required");
    }
  
    // If all validations pass, proceed to the next middleware or route handler
    next();
  };
  
