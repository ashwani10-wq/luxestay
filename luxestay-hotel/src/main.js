import './index.css';

// Room Data
const FEATURED_ROOMS = [
  {
    id: '1',
    name: 'Deluxe Ocean Suite',
    description: 'Breathtaking views of the Pacific Ocean with a private balcony and floor-to-ceiling windows.',
    price: 450,
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=1000',
    amenities: ['Ocean View', 'King Bed', 'Mini Bar', 'Free WiFi'],
    capacity: 2
  },
  {
    id: '2',
    name: 'Presidential Penthouse',
    description: 'The ultimate luxury experience. Two bedrooms, a private pool, and 24/7 butler service.',
    price: 1200,
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&q=80&w=1000',
    amenities: ['Private Pool', 'Butler Service', 'Kitchen', 'Terrace'],
    capacity: 4
  },
  {
    id: '3',
    name: 'Garden Villa',
    description: 'Surrounded by lush tropical gardens, this villa offers tranquility and complete privacy.',
    price: 350,
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=1000',
    amenities: ['Garden View', 'Outdoor Shower', 'King Bed', 'Spa Access'],
    capacity: 2
  },
  {
    id: '4',
    name: 'Executive Studio',
    description: 'Perfect for business travelers. Modern design with a dedicated workspace and high-speed internet.',
    price: 280,
    image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&q=80&w=1000',
    amenities: ['Workspace', 'Smart TV', 'Nespresso', 'Gym Access'],
    capacity: 2
  },
  {
    id: '5',
    name: 'Royal Family Suite',
    description: 'Spacious interconnecting rooms designed for families who value comfort and elegance.',
    price: 650,
    image: 'https://images.unsplash.com/photo-1595576508898-0ad5c879a061?auto=format&fit=crop&q=80&w=1000',
    amenities: ['2 Bedrooms', 'Kids Area', 'Breakfast Inc.', 'Lounge'],
    capacity: 5
  },
  {
    id: '6',
    name: 'Heritage Loft',
    description: 'Exposed brick walls and vintage furnishings combine for a unique, sophisticated stay.',
    price: 320,
    image: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&q=80&w=1000',
    amenities: ['Vintage Decor', 'City View', 'Soaking Tub', 'WiFi'],
    capacity: 2
  }
];

// State
let currentRoom = null;

// DOM Elements
const roomsGrid = document.getElementById('rooms-grid');
const bookingModal = document.getElementById('booking-modal');
const closeModalBtn = document.getElementById('close-modal');
const heroSearchBtn = document.getElementById('hero-search-btn');

// Modal Elements
const modalRoomImage = document.getElementById('modal-room-image');
const modalRoomName = document.getElementById('modal-room-name');
const modalRoomPriceText = document.getElementById('modal-room-price-text');
const modalCheckIn = document.getElementById('modal-check-in');
const modalCheckOut = document.getElementById('modal-check-out');
const modalGuests = document.getElementById('modal-guests');
const priceBreakdown = document.getElementById('price-breakdown');
const subtotalText = document.getElementById('subtotal');
const totalPriceText = document.getElementById('total-price');
const confirmBookingBtn = document.getElementById('confirm-booking-btn');

// Initialize
function init() {
  renderRooms();
  setupEventListeners();
  // @ts-ignore
  lucide.createIcons();
}

function renderRooms() {
  roomsGrid.innerHTML = FEATURED_ROOMS.map(room => `
    <div class="group bg-white border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
      <div class="relative h-64 overflow-hidden">
        <img 
          src="${room.image}" 
          alt="${room.name}"
          class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div class="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded text-sm font-medium text-[#1a1a1a]">
          $${room.price} / night
        </div>
      </div>
      
      <div class="p-6">
        <div class="flex justify-between items-start mb-2">
          <h3 class="text-xl font-serif text-[#1a1a1a]">${room.name}</h3>
          <span class="text-xs text-gray-400 uppercase tracking-widest">Up to ${room.capacity} Guests</span>
        </div>
        
        <p class="text-gray-500 text-sm mb-6 line-clamp-2">
          ${room.description}
        </p>
        
        <div class="flex flex-wrap gap-2 mb-6">
          ${room.amenities.slice(0, 3).map(amenity => `
            <span class="text-[10px] uppercase tracking-widest bg-gray-50 text-gray-400 px-2 py-1 rounded">
              ${amenity}
            </span>
          `).join('')}
        </div>
        
        <button 
          onclick="openBookingModal('${room.id}')"
          class="w-full border border-[#1a1a1a] text-[#1a1a1a] py-3 rounded text-sm font-medium hover:bg-[#1a1a1a] hover:text-white transition-all duration-300 uppercase tracking-widest"
        >
          Book This Room
        </button>
      </div>
    </div>
  `).join('');
}

function setupEventListeners() {
  closeModalBtn.addEventListener('click', closeModal);
  
  // Close modal on outside click
  bookingModal.addEventListener('click', (e) => {
    if (e.target === bookingModal) closeModal();
  });

  modalCheckIn.addEventListener('change', calculatePrice);
  modalCheckOut.addEventListener('change', calculatePrice);
  
  heroSearchBtn.addEventListener('click', () => {
    const roomsSection = document.getElementById('featured-rooms');
    roomsSection.scrollIntoView({ behavior: 'smooth' });
  });

  confirmBookingBtn.addEventListener('click', () => {
    if (!modalCheckIn.value || !modalCheckOut.value) {
      alert('Please select check-in and check-out dates.');
      return;
    }
    alert('Booking confirmed! Thank you for choosing LuxeStay.');
    closeModal();
  });
}

// Global functions for inline onclick
window.openBookingModal = (roomId) => {
  currentRoom = FEATURED_ROOMS.find(r => r.id === roomId);
  if (!currentRoom) return;

  modalRoomImage.src = currentRoom.image;
  modalRoomName.textContent = currentRoom.name;
  modalRoomPriceText.textContent = `$${currentRoom.price} / night`;
  
  // Reset fields
  modalCheckIn.value = '';
  modalCheckOut.value = '';
  modalGuests.value = '1';
  calculatePrice();

  bookingModal.classList.remove('hidden');
  bookingModal.classList.add('flex');
  document.body.style.overflow = 'hidden';
};

function closeModal() {
  bookingModal.classList.add('hidden');
  bookingModal.classList.remove('flex');
  document.body.style.overflow = 'auto';
}

function calculatePrice() {
  if (!modalCheckIn.value || !modalCheckOut.value || !currentRoom) {
    priceBreakdown.textContent = `$${currentRoom?.price || 0} x 0 nights`;
    subtotalText.textContent = '$0';
    totalPriceText.textContent = '$0';
    return;
  }

  const start = new Date(modalCheckIn.value);
  const end = new Date(modalCheckOut.value);
  
  if (end <= start) {
    alert('Check-out date must be after check-in date.');
    modalCheckOut.value = '';
    return;
  }

  const diffTime = Math.abs(end.getTime() - start.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  const total = diffDays * currentRoom.price;
  
  priceBreakdown.textContent = `$${currentRoom.price} x ${diffDays} nights`;
  subtotalText.textContent = `$${total}`;
  totalPriceText.textContent = `$${total}`;
}

// Run init
init();
