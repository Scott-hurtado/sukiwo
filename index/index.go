package partials

import (
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
)

// Estructuras para nuestros servicios - como moldes japoneses perfectos 🏺
type Servicio struct {
	ID          int      `json:"id"`
	Titulo      string   `json:"titulo"`
	Descripcion string   `json:"descripcion"`
	Precio      float64  `json:"precio"`
	Categoria   string   `json:"categoria"`
	Proveedor   string   `json:"proveedor"`
	Rating      float64  `json:"rating"`
	Imagen      string   `json:"imagen"`
	Tags        []string `json:"tags"`
}

type Categoria struct {
	ID     int    `json:"id"`
	Nombre string `json:"nombre"`
	Icono  string `json:"icono"`
	Color  string `json:"color"`
}

// PageData contiene todos los datos necesarios para renderizar el index
type PageData struct {
	Servicios  []Servicio  `json:"servicios"`
	Categorias []Categoria `json:"categorias"`
	Titulo     string      `json:"titulo"`
}

// MostrarIndex maneja la ruta principal del marketplace
func MostrarIndex(c *gin.Context) {
	// Obtenemos los datos necesarios para la página
	pageData := GetIndexData()
	
	// Renderizamos la plantilla con los datos
	c.HTML(http.StatusOK, "index.html", gin.H{
		"servicios":  pageData.Servicios,
		"categorias": pageData.Categorias,
		"titulo":     pageData.Titulo,
	})
}

// GetIndexData obtiene todos los datos necesarios para el index
func GetIndexData() PageData {
	return PageData{
		Servicios:  ObtenerServiciosDestacados(),
		Categorias: ObtenerCategorias(),
		Titulo:     "Sukiwo - Tu marketplace de servicios",
	}
}

// ObtenerServiciosDestacados devuelve los servicios más populares
func ObtenerServiciosDestacados() []Servicio {
	// Por ahora servicios de ejemplo - muy variados como Fiverr
	return []Servicio{
		{
			ID:          1,
			Titulo:      "Traducción Japonés-Español",
			Descripcion: "Traduzco documentos, textos y contenido web del japonés al español con precisión nativa",
			Precio:      25.00,
			Categoria:   "Traducción",
			Proveedor:   "Yuki Tanaka",
			Rating:      4.9,
			Imagen:      "traductor.jpg",
			Tags:        []string{"Japonés", "Español", "Documentos", "Nativo"},
		},
		{
			ID:          2,
			Titulo:      "Clases de Guitarra Online",
			Descripcion: "Aprende guitarra desde cero o perfecciona tu técnica con clases personalizadas",
			Precio:      15.00,
			Categoria:   "Música",
			Proveedor:   "Carlos Mendoza",
			Rating:      4.8,
			Imagen:      "guitarra.jpg",
			Tags:        []string{"Guitarra", "Música", "Online", "Principiantes"},
		},
		{
			ID:          3,
			Titulo:      "Diseño de Logos Profesionales",
			Descripcion: "Creo logos únicos y memorables para tu marca con estilo moderno y minimalista",
			Precio:      50.00,
			Categoria:   "Diseño",
			Proveedor:   "Ana García",
			Rating:      5.0,
			Imagen:      "logo-design.jpg",
			Tags:        []string{"Logo", "Branding", "Diseño", "Profesional"},
		},
		{
			ID:          4,
			Titulo:      "Reparación de Plomería",
			Descripcion: "Servicio rápido y confiable para todas tus necesidades de plomería residencial",
			Precio:      40.00,
			Categoria:   "Hogar",
			Proveedor:   "Miguel Rodríguez",
			Rating:      4.7,
			Imagen:      "plomeria.jpg",
			Tags:        []string{"Plomería", "Reparación", "Hogar", "Urgente"},
		},
		{
			ID:          5,
			Titulo:      "Programación Web Personalizada",
			Descripcion: "Desarrollo sitios web y aplicaciones a medida usando las últimas tecnologías",
			Precio:      100.00,
			Categoria:   "Tecnología",
			Proveedor:   "David Kim",
			Rating:      4.9,
			Imagen:      "programming.jpg",
			Tags:        []string{"Web", "Programación", "React", "Go"},
		},
		{
			ID:          6,
			Titulo:      "Albañilería y Construcción",
			Descripcion: "Servicios completos de albañilería, remodelaciones y construcción menor",
			Precio:      60.00,
			Categoria:   "Construcción",
			Proveedor:   "Roberto Silva",
			Rating:      4.6,
			Imagen:      "albanileria.jpg",
			Tags:        []string{"Albañilería", "Construcción", "Remodelación"},
		},
		{
			ID:          7,
			Titulo:      "Fotografía de Eventos",
			Descripcion: "Capturo los momentos más especiales de tu evento con estilo profesional",
			Precio:      80.00,
			Categoria:   "Fotografía",
			Proveedor:   "Laura Fernández",
			Rating:      4.8,
			Imagen:      "fotografia.jpg",
			Tags:        []string{"Fotografía", "Eventos", "Bodas", "Profesional"},
		},
		{
			ID:          8,
			Titulo:      "Marketing Digital Integral",
			Descripcion: "Estrategias completas de marketing digital para hacer crecer tu negocio online",
			Precio:      120.00,
			Categoria:   "Marketing",
			Proveedor:   "Pedro Martínez",
			Rating:      4.7,
			Imagen:      "marketing.jpg",
			Tags:        []string{"Marketing", "Digital", "SEO", "Redes Sociales"},
		},
	}
}

// ObtenerCategorias devuelve todas las categorías disponibles
func ObtenerCategorias() []Categoria {
	return []Categoria{
		{ID: 1, Nombre: "Traducción", Icono: "fas fa-language", Color: "#DC143C"},
		{ID: 2, Nombre: "Música", Icono: "fas fa-music", Color: "#B22222"},
		{ID: 3, Nombre: "Diseño", Icono: "fas fa-palette", Color: "#DC143C"},
		{ID: 4, Nombre: "Hogar", Icono: "fas fa-home", Color: "#B22222"},
		{ID: 5, Nombre: "Tecnología", Icono: "fas fa-laptop-code", Color: "#DC143C"},
		{ID: 6, Nombre: "Construcción", Icono: "fas fa-hammer", Color: "#B22222"},
		{ID: 7, Nombre: "Educación", Icono: "fas fa-graduation-cap", Color: "#DC143C"},
		{ID: 8, Nombre: "Marketing", Icono: "fas fa-bullhorn", Color: "#B22222"},
		{ID: 9, Nombre: "Fotografía", Icono: "fas fa-camera", Color: "#DC143C"},
	}
}

// ObtenerServicioPorID busca un servicio específico por su ID
func ObtenerServicioPorID(id int) *Servicio {
	servicios := ObtenerServiciosDestacados()
	
	for _, servicio := range servicios {
		if servicio.ID == id {
			return &servicio
		}
	}
	
	return nil
}

// ObtenerServiciosPorCategoria filtra servicios por categoría
func ObtenerServiciosPorCategoria(categoria string) []Servicio {
	servicios := ObtenerServiciosDestacados()
	var serviciosFiltrados []Servicio
	
	for _, servicio := range servicios {
		if servicio.Categoria == categoria {
			serviciosFiltrados = append(serviciosFiltrados, servicio)
		}
	}
	
	return serviciosFiltrados
}

// BuscarServicios busca servicios por término de búsqueda
func BuscarServicios(termino string) []Servicio {
	servicios := ObtenerServiciosDestacados()
	var serviciosEncontrados []Servicio
	
	// Convertir término a minúsculas para búsqueda case-insensitive
	terminoLower := strings.ToLower(termino)
	
	for _, servicio := range servicios {
		// Buscar en título, descripción y tags
		if strings.Contains(strings.ToLower(servicio.Titulo), terminoLower) ||
		   strings.Contains(strings.ToLower(servicio.Descripcion), terminoLower) ||
		   strings.Contains(strings.ToLower(servicio.Categoria), terminoLower) ||
		   strings.Contains(strings.ToLower(servicio.Proveedor), terminoLower) {
			serviciosEncontrados = append(serviciosEncontrados, servicio)
			continue
		}
		
		// Buscar en tags
		for _, tag := range servicio.Tags {
			if strings.Contains(strings.ToLower(tag), terminoLower) {
				serviciosEncontrados = append(serviciosEncontrados, servicio)
				break
			}
		}
	}
	
	return serviciosEncontrados
}

// GetEstadisticas devuelve estadísticas generales del marketplace
func GetEstadisticas() map[string]interface{} {
	servicios := ObtenerServiciosDestacados()
	categorias := ObtenerCategorias()
	
	// Calcular rating promedio
	var sumaRatings float64
	for _, servicio := range servicios {
		sumaRatings += servicio.Rating
	}
	
	ratingPromedio := sumaRatings / float64(len(servicios))
	
	return map[string]interface{}{
		"total_servicios":      len(servicios),
		"total_categorias":     len(categorias),
		"rating_promedio":      ratingPromedio,
		"profesionales_activos": "5K+",
		"proyectos_completados": "12K+",
	}
}

// ==========================================
// 🌐 API ROUTES & HANDLERS
// ==========================================

// ConfigurarRutasAPI configura todas las rutas de la API
func ConfigurarRutasAPI(router *gin.Engine) {
	api := router.Group("/api/v1")
	{
		// Servicios
		api.GET("/servicios", getServicios)
		api.GET("/servicios/:id", getServicioPorID)
		api.GET("/servicios/categoria/:categoria", getServiciosPorCategoria)
		api.GET("/buscar", buscarServicios)
		
		// Categorías
		api.GET("/categorias", getCategorias)
		
		// Estadísticas
		api.GET("/estadisticas", getEstadisticas)
	}
}

// ==========================================
// 📡 API HANDLERS
// ==========================================

func getServicios(c *gin.Context) {
	servicios := ObtenerServiciosDestacados()
	c.JSON(200, gin.H{
		"servicios": servicios,
		"total":     len(servicios),
	})
}

func getServicioPorID(c *gin.Context) {
	id := c.Param("id")
	// Convertir string a int (simplificado para el ejemplo)
	var servicioID int
	switch id {
	case "1": servicioID = 1
	case "2": servicioID = 2
	case "3": servicioID = 3
	case "4": servicioID = 4
	case "5": servicioID = 5
	case "6": servicioID = 6
	case "7": servicioID = 7
	case "8": servicioID = 8
	default:
		c.JSON(404, gin.H{"error": "Servicio no encontrado"})
		return
	}
	
	servicio := ObtenerServicioPorID(servicioID)
	if servicio == nil {
		c.JSON(404, gin.H{"error": "Servicio no encontrado"})
		return
	}
	
	c.JSON(200, gin.H{"servicio": servicio})
}

func getServiciosPorCategoria(c *gin.Context) {
	categoria := c.Param("categoria")
	servicios := ObtenerServiciosPorCategoria(categoria)
	
	c.JSON(200, gin.H{
		"servicios": servicios,
		"categoria": categoria,
		"total":     len(servicios),
	})
}

func buscarServicios(c *gin.Context) {
	termino := c.Query("q")
	if termino == "" {
		c.JSON(400, gin.H{"error": "Parámetro de búsqueda 'q' requerido"})
		return
	}
	
	servicios := BuscarServicios(termino)
	
	c.JSON(200, gin.H{
		"servicios": servicios,
		"termino":   termino,
		"total":     len(servicios),
	})
}

func getCategorias(c *gin.Context) {
	categorias := ObtenerCategorias()
	c.JSON(200, gin.H{
		"categorias": categorias,
		"total":      len(categorias),
	})
}

func getEstadisticas(c *gin.Context) {
	estadisticas := GetEstadisticas()
	c.JSON(200, gin.H{"estadisticas": estadisticas})
}