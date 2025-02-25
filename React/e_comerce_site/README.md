
# **E-Commerce App (React + Fake Store API)**  

- **Fake Store API** → Provides product data for the store.  
- **Axios** → Handles API requests for fetching, adding, and updating products.  
- **React Router DOM** → Manages navigation between pages (Cart, Home, Search, Login, Product Details).  
- **React Query** → Optimizes fetching and caching of individual product data.  
- **React Context API** → Manages authentication and cart state globally.  

1. **Search Query with Routes** → Uses `useLocation` & `URLSearchParams` to filter products dynamically based on search input.  
2. **Add to Cart** → Stores selected products in a global cart state using `useContext`.  
3. **Delete from Cart** → Allows admin to remove items from the cart, updating the global cart state.  
4. **Separate Login for Admin** → Uses `AuthContext` to differentiate between admin and regular users.  
5. **Admin Can Add & Edit Products** → Admins can create new products (stored in state) and modify existing ones.  
6. **Load & View Individual Products** → Uses **React Query** (`useQuery`) to efficiently fetch and cache product details.  


https://github.com/user-attachments/assets/c39f3c08-d82a-4b3f-8775-0a10de6ff25d
