from flask import Blueprint, render_template, redirect, url_for, flash, request, abort, session
from flask_login import login_user, logout_user, login_required, current_user
from ..models import User, get_user_by_username, create_user

auth_bp = Blueprint('auth', __name__, url_prefix='/auth')

@auth_bp.route('/select-product', methods=['GET', 'POST'])
@login_required
def select_product():
    from ..models import get_user_products
    from flask import current_app
    
    # Admin users get access to all configured products
    if current_user.is_admin():
        assigned_products = current_app.config['AVAILABLE_PRODUCTS']
    else:
        # Regular users only see their assigned products
        assigned_products = get_user_products(current_user.id)
    
    if request.method == 'POST':
        product = request.form.get('product')
        if product:
            # Verify access (admin can access any product, others need assignment)
            if current_user.is_admin() or product in assigned_products:
                session['selected_product'] = product
                return redirect(url_for('main.index'))
            else:
                 flash('Access denied to this product.')
        else:
            flash('Please select a product.')
            
    return render_template('auth/select_product.html', products=assigned_products)

@auth_bp.route('/login', methods=['GET', 'POST'])
def login():
    if current_user.is_authenticated:
        if 'selected_product' in session:
             return redirect(url_for('main.index'))
        return redirect(url_for('auth.select_product'))
        
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        
        user = get_user_by_username(username)
        
        if not user or not user.check_password(password):
            flash('Please check your login details and try again.')
            return redirect(url_for('auth.login'))

        login_user(user)
        return redirect(url_for('auth.select_product'))

    return render_template('auth/login.html')

@auth_bp.route('/register', methods=['GET', 'POST'])
@login_required
def register():
    # Only Admin can create users
    if not current_user.is_admin():
        abort(403)
        
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        role = request.form.get('role', 'Tester') # Default to Tester

        user = get_user_by_username(username)

        if user:
            flash('Username already exists.')
            return redirect(url_for('auth.register'))

        if create_user(username, password, role):
            # Add assigned products
            selected_products = request.form.getlist('products')
            if selected_products:
                # Need user_id, but create_user returns boolean. 
                # We should probably get the user by username to get ID.
                new_user = get_user_by_username(username)
                if new_user:
                    from ..models import update_user_products
                    update_user_products(new_user.id, selected_products)
            
            flash(f'User {username} created successfully.')
            return redirect(url_for('auth.register')) # Stay on page to add more
        else:
            flash('Registration failed.')

    from flask import current_app
    all_products = current_app.config['AVAILABLE_PRODUCTS']
    return render_template('auth/register.html', all_products=all_products)

@auth_bp.route('/logout')
@login_required
def logout():
    logout_user()
    session.pop('selected_product', None)
    return redirect(url_for('auth.login'))
