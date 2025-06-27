const autos = [
  // BMW
  { marca: 'BMW', modelo: 'Serie 3', year: 2015, precio: 30000, puertas: 4, color: 'Blanco', transmision: 'automatico' },
  { marca: 'BMW', modelo: 'Serie 5', year: 2018, precio: 50000, puertas: 4, color: 'Negro', transmision: 'automatico' },
  { marca: 'BMW', modelo: 'X3', year: 2020, precio: 70000, puertas: 4, color: 'Rojo', transmision: 'manual' },
  { marca: 'BMW', modelo: 'X5', year: 2025, precio: 90000, puertas: 4, color: 'Blanco', transmision: 'automatico' },

  // Audi
  { marca: 'Audi', modelo: 'A4', year: 2016, precio: 35000, puertas: 4, color: 'Azul', transmision: 'automatico' },
  { marca: 'Audi', modelo: 'A6', year: 2019, precio: 40000, puertas: 4, color: 'Negro', transmision: 'manual' },
  { marca: 'Audi', modelo: 'Q5', year: 2022, precio: 60000, puertas: 4, color: 'Blanco', transmision: 'automatico' },
  { marca: 'Audi', modelo: 'Q7', year: 2025, precio: 85000, puertas: 4, color: 'Rojo', transmision: 'manual' },

  // Mercedes Benz
  { marca: 'Mercedes Benz', modelo: 'Clase C', year: 2017, precio: 45000, puertas: 4, color: 'Negro', transmision: 'automatico' },
  { marca: 'Mercedes Benz', modelo: 'Clase E', year: 2020, precio: 70000, puertas: 4, color: 'Blanco', transmision: 'manual' },
  { marca: 'Mercedes Benz', modelo: 'Clase S', year: 2023, precio: 120000, puertas: 4, color: 'Azul', transmision: 'automatico' },
  { marca: 'Mercedes Benz', modelo: 'GLA', year: 2025, precio: 65000, puertas: 4, color: 'Rojo', transmision: 'manual' },

  // Chevrolet
  { marca: 'Chevrolet', modelo: 'Camaro', year: 2015, precio: 25000, puertas: 2, color: 'Rojo', transmision: 'manual' },
  { marca: 'Chevrolet', modelo: 'Malibu', year: 2018, precio: 30000, puertas: 4, color: 'Azul', transmision: 'automatico' },
  { marca: 'Chevrolet', modelo: 'Tahoe', year: 2021, precio: 70000, puertas: 4, color: 'Negro', transmision: 'automatico' },
  { marca: 'Chevrolet', modelo: 'Blazer', year: 2025, precio: 45000, puertas: 4, color: 'Blanco', transmision: 'manual' },

  // Ford
  { marca: 'Ford', modelo: 'Mustang', year: 2016, precio: 40000, puertas: 2, color: 'Rojo', transmision: 'manual' },
  { marca: 'Ford', modelo: 'Explorer', year: 2021, precio: 60000, puertas: 4, color: 'Negro', transmision: 'automatico' },
  { marca: 'Ford', modelo: 'F-150', year: 2023, precio: 75000, puertas: 4, color: 'Azul', transmision: 'automatico' },
  { marca: 'Ford', modelo: 'Escape', year: 2025, precio: 35000, puertas: 4, color: 'Blanco', transmision: 'manual' },

  // Dodge
  { marca: 'Dodge', modelo: 'Challenger', year: 2017, precio: 35000, puertas: 2, color: 'Blanco', transmision: 'manual' },
  { marca: 'Dodge', modelo: 'Durango', year: 2023, precio: 50000, puertas: 4, color: 'Rojo', transmision: 'automatico' },
  { marca: 'Dodge', modelo: 'Ram 1500', year: 2024, precio: 80000, puertas: 4, color: 'Negro', transmision: 'manual' },
  { marca: 'Dodge', modelo: 'Journey', year: 2025, precio: 40000, puertas: 4, color: 'Azul', transmision: 'automatico' },

  // Otros para más variedad
  { marca: 'Tesla', modelo: 'Model 3', year: 2019, precio: 80000, puertas: 4, color: 'Blanco', transmision: 'automatico' },
  { marca: 'Toyota', modelo: 'Corolla', year: 2018, precio: 20000, puertas: 4, color: 'Negro', transmision: 'manual' },
  { marca: 'Honda', modelo: 'Civic', year: 2020, precio: 22000, puertas: 4, color: 'Rojo', transmision: 'manual' },
  { marca: 'Nissan', modelo: 'Sentra', year: 2022, precio: 21000, puertas: 4, color: 'Azul', transmision: 'automatico' }
];
