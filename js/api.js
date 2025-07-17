let chart = null;
let ultimaSeleccion = null;

// Listado estático top 20 (sí, no es dinámico, pero funciona para demo)
const top20 = [
  { symbol: 'BTC', name: 'Bitcoin' },
  { symbol: 'ETH', name: 'Ethereum' },
  { symbol: 'BNB', name: 'Binance Coin' },
  { symbol: 'ADA', name: 'Cardano' },
  { symbol: 'DOGE', name: 'Dogecoin' },
  { symbol: 'XRP', name: 'Ripple' },
  { symbol: 'DOT', name: 'Polkadot' },
  { symbol: 'UNI', name: 'Uniswap' },
  { symbol: 'LTC', name: 'Litecoin' },
  { symbol: 'BCH', name: 'Bitcoin Cash' },
  { symbol: 'LINK', name: 'Chainlink' },
  { symbol: 'SOL', name: 'Solana' },
  { symbol: 'MATIC', name: 'Polygon' },
  { symbol: 'VET', name: 'VeChain' },
  { symbol: 'FIL', name: 'Filecoin' },
  { symbol: 'THETA', name: 'Theta' },
  { symbol: 'TRX', name: 'TRON' },
  { symbol: 'EOS', name: 'EOS' },
  { symbol: 'AAVE', name: 'Aave' },
  { symbol: 'XLM', name: 'Stellar' }
];

function cargarTop20() {
  const select = document.getElementById('crypto-select');
  select.innerHTML = '<option value="">-- Elegir cripto --</option>';

  top20.forEach(c => {
    const option = document.createElement('option');
    option.value = c.symbol;
    option.textContent = c.name;
    select.appendChild(option);
  });
}

async function mostrarPrecio(symbol) {
  if (!symbol) {
    document.getElementById('resultado').innerHTML = '';
    return;
  }
  try {
    const url = `https://min-api.cryptocompare.com/data/price?fsym=${symbol}&tsyms=USD`;
    const res = await fetch(url);
    const data = await res.json();

    if (data.Response === 'Error') {
      document.getElementById('resultado').innerHTML = '<p>No se encontró el precio.</p>';
      return;
    }

    document.getElementById('resultado').innerHTML = `<h2>Precio: $${data.USD} USD</h2>`;
  } catch (e) {
    console.error('Error al obtener precio:', e);
  }
}

async function mostrarGrafico(symbol) {
  if (!symbol) {
    if (chart) {
      chart.destroy();
      chart = null;
    }
    return;
  }
  try {
    // Últimos 7 días, datos diarios
    const url = `https://min-api.cryptocompare.com/data/v2/histoday?fsym=${symbol}&tsym=USD&limit=6`;
    const res = await fetch(url);
    const data = await res.json();

    if (data.Response === 'Error' || !data.Data || !data.Data.Data.length) {
      document.getElementById('resultado').innerHTML += '<p>No hay datos para gráfico.</p>';
      if (chart) {
        chart.destroy();
        chart = null;
      }
      return;
    }

    const labels = data.Data.Data.map(item => {
      const date = new Date(item.time * 1000);
      return date.toLocaleDateString();
    });

    const precios = data.Data.Data.map(item => item.close);

    const ctx = document.getElementById('cryptoChart').getContext('2d');
    if (chart) chart.destroy();

    chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [{
          label: `Precio USD - ${symbol}`,
          data: precios,
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: { beginAtZero: false }
        }
      }
    });
  } catch (e) {
    console.error('Error al obtener gráfico:', e);
  }
}

document.getElementById('crypto-select').addEventListener('change', (e) => {
  const symbol = e.target.value;
  ultimaSeleccion = symbol;

  if (!symbol) {
    document.getElementById('resultado').innerHTML = '';
    if (chart) {
      chart.destroy();
      chart = null;
    }
    return;
  }

  mostrarPrecio(symbol);
  mostrarGrafico(symbol);
});

cargarTop20();
