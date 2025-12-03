// Initialize admin account if it doesn't exist
export const initializeAdminAccount = () => {
  const registeredUsers = JSON.parse(localStorage.getItem("bibliosmart_registered_users") || "[]");

  // Check if admin already exists
  const adminExists = registeredUsers.some((u: any) => u.role === "admin");

  if (!adminExists) {
    const adminUser = {
      id: "admin-default",
      name: "Administrator",
      email: "admin@library.com",
      password: "admin123",
      role: "admin"
    };

    registeredUsers.push(adminUser);
    localStorage.setItem("bibliosmart_registered_users", JSON.stringify(registeredUsers));
    console.log("✅ Default admin account created: admin@library.com / admin123");
  }
};
