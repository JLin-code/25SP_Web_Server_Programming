require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY || process.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * User model for database operations
 */
const UsersModel = {
  /**
   * Get all users
   * @returns {Promise<Array>} Array of user objects
   */
  async getAll() {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*');
      
      if (error) throw error;
      
      return { 
        success: true, 
        items: data 
      };
    } catch (error) {
      console.error('Error fetching users:', error);
      return { 
        success: false, 
        message: 'Failed to retrieve users', 
        error 
      };
    }
  },

  /**
   * Get user by ID
   * @param {number} id - User ID
   * @returns {Promise<Object>} User object
   */
  async getById(id) {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      
      return { 
        success: true, 
        item: data 
      };
    } catch (error) {
      console.error(`Error fetching user ${id}:`, error);
      return { 
        success: false, 
        message: 'User not found', 
        error 
      };
    }
  },

  /**
   * Create new user
   * @param {Object} userData - User data
   * @returns {Promise<Object>} Created user
   */
  async create(userData) {
    try {
      const { data, error } = await supabase
        .from('users')
        .insert([userData])
        .select();
      
      if (error) throw error;
      
      return { 
        success: true, 
        item: data[0] 
      };
    } catch (error) {
      console.error('Error creating user:', error);
      return { 
        success: false, 
        message: 'Failed to create user', 
        error 
      };
    }
  },

  /**
   * Update user
   * @param {number} id - User ID
   * @param {Object} userData - User data to update
   * @returns {Promise<Object>} Updated user
   */
  async update(id, userData) {
    try {
      const { data, error } = await supabase
        .from('users')
        .update(userData)
        .eq('id', id)
        .select();
      
      if (error) throw error;
      
      return { 
        success: true, 
        item: data[0] 
      };
    } catch (error) {
      console.error(`Error updating user ${id}:`, error);
      return { 
        success: false, 
        message: 'Failed to update user', 
        error 
      };
    }
  },

  /**
   * Delete user
   * @param {number} id - User ID
   * @returns {Promise<boolean>} Success status
   */
  async delete(id) {
    try {
      const { error } = await supabase
        .from('users')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      return { 
        success: true 
      };
    } catch (error) {
      console.error(`Error deleting user ${id}:`, error);
      return { 
        success: false, 
        message: 'Failed to delete user', 
        error 
      };
    }
  }
};

module.exports = UsersModel;
