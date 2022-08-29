<?php
/* Clase de LfPHP para hacer conexion y consultas */
	class rei
	{
	  var $c;
	  var $conexion = "127.0.0.1";
	  var $usuario 	= "root"; 
	  var $clave 	= ""; 
	  var $base 	= "cartasimpleub_cs_v2";
	  var $proyecto = "";
	  
	  /*variables de resultado*/
	  // var $total_consultas = 0;


	  public function conectar()
	  { 
	    if($this->conexion != "") // si tiene conexion
	    	return @mysqli_connect($this->conexion, $this->usuario, $this->clave, $this->base);
	  }

	  public function proyecto()
	  {
	  	return $this->proyecto;
	  }

	  public function pedido($c, $sql)   // ex consulta
	  { 
	    $res 			= @mysqli_query($c, $sql);
	    $cant 			= @mysqli_num_rows($res);
	    if(!$res)
	      $re 	= false;
	  	else
	  	{
	  		$re['cantidad'] = $cant;

	  		if ($cant > 0) 
	  		{
		  		for ($i=0; $i<$cant; $i++)
		  			$re['datos'][$i] = @mysqli_fetch_array($res, MYSQLI_ASSOC);
		  		$re['aviso'] = true;
	  		}
	  		else
	  			$re['aviso'] = false;
	  	}
	    return $re;
	  }

	  	public function delete($c, $sql)
		{
			$res 			= @mysqli_query($c, $sql);
			$re['aviso'] = (!$res) ? false : true;

			return $re;
		}

		public function update($c, $sql)
		{
			$res 			= @mysqli_query($c, $sql);
			$re['aviso'] = (!$res) ? false : true;

			return $re;
		}

	  public function carga($c, $sql)   // ex consulta
	  { 
	    $res 			= @mysqli_query($c, $sql);
	    if(!$res)
	      $res 	= false;
	  	else
	  	  $res 	= true;
	    return $res;
	  }

	  public function traeDatos($res)
	  {
	   	return @mysqli_fetch_array($res, MYSQLI_ASSOC);
	  }

	  public function cantidadDeDatos($res)
	  {
	   return @mysqli_num_rows($res);
	  }

	  public function datosTotales()
	  {
	   return $this->total_consultas; 
	  }

	  public function cerrarConexion($c)
	  {
	   	return @mysqli_close($c);
	  }
	  
	  public function str_replace_assoc($sql) 
	  {
	  	 $replace = array('(me)'=>'<','(ma)'=>'>','(mei)'=>'<=','(mai)'=>'>=','(ig)'=>'=', '(s)'=>'+', '(r)'=>'-', '|'=>"'",'(p)'=>'%','(amper)'=>'&');
		 return str_replace(array_keys($replace), array_values($replace), $sql);
	  }

	  public function ultimo_id($c)
	  {
	  	return mysqli_insert_id($c);
	  }
	}
?>