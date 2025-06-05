class AppColor {
  // Primary colors
  static primary = '#007bff';
  static secondary = '#6c757d';
  static success = '#28a745';
  static danger = '#dc3545';
  static warning = '#ffc107';
  
  // Base colors
  static white = '#ffffff';
  static black = '#000000';
  
  // Brand colors
  static goldLight = '#E0CF89';
  static goldDark = '#A08741';
  
  // Interface colors
  static darkCharcoal = '#211920';  // Play icon color
  
  // Gradients
  static getGoldGradient = () => `linear-gradient(90deg, ${AppColor.goldLight} 0%, ${AppColor.goldDark} 100%)`;
}

export default AppColor; 