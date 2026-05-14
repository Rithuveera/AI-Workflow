from flask import Blueprint, render_template, redirect, url_for, flash, request, abort
from flask_login import login_required, current_user
from ..models import get_all_users, get_user_by_id, update_user

admin_bp = Blueprint('admin', __name__, url_prefix='/admin')

@admin_bp.before_request
@login_required
def require_admin():
    if not current_user.is_admin():
        abort(403)

@admin_bp.route('/users')
def list_users():
    users = get_all_users()
    return render_template('admin/users.html', users=users)

@admin_bp.route('/users/edit/<int:user_id>', methods=['GET', 'POST'])
def edit_user(user_id):
    user = get_user_by_id(user_id)
    if not user:
        flash('User not found.')
        return redirect(url_for('admin.list_users'))
    
    if request.method == 'POST':
        username = request.form.get('username')
        role = request.form.get('role')
        password = request.form.get('password')
        
        # If password field is empty, pass None so it doesn't verify/change
        if not password or password.strip() == "":
            password = None
            
        if update_user(user_id, username, role, password):
            # Update Products
            selected_products = request.form.getlist('products')
            from ..models import update_user_products
            update_user_products(user_id, selected_products)
            
            flash(f'User {username} updated successfully.')
            return redirect(url_for('admin.list_users'))
        else:
            flash('Failed to update user. Username may already exist.')
            
            flash('Failed to update user. Username may already exist.')
            
    from ..models import get_user_products
    from flask import current_app
    all_products = current_app.config['AVAILABLE_PRODUCTS']
    assigned_products = get_user_products(user_id)
    return render_template('admin/edit_user.html', user=user, all_products=all_products, assigned_products=assigned_products)
