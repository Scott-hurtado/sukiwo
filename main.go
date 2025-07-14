package main

import (
	"log"

	"github.com/gin-gonic/gin"
	"sukiwo/index"
)

func main() {
	// Gin es nuestro servidor web - como un mayordomo japonés muy eficiente 🍵
	router := gin.Default()
	
	// Le decimos a Gin dónde encontrar nuestros archivos HTML
	router.LoadHTMLGlob("templates/*.html")
	
	// Archivos estáticos (CSS, JS, imágenes)
	router.Static("/static", "./static")
	
	// 🏠 Ruta principal - el index de Sukiwo
	router.GET("/", partials.MostrarIndex)
	
	// 🌐 Configurar todas las rutas API (definidas en partials/sukiwo.go)
	partials.ConfigurarRutasAPI(router)
	
	// Iniciamos el servidor
	log.Println("🎌 Sukiwo iniciado en http://localhost:8080")
	log.Println("🏮 ¡Bienvenido al marketplace japonés!")
	log.Println("✨ Diseño limpio - Todo modularizado en partials/")
	log.Println("🌐 APIs disponibles en /api/v1/")
	router.Run(":8080")
}