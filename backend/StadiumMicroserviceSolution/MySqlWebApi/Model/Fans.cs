﻿using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace MySqlWebApi.Model
{
    public class Fans
    {

        [Key]
        public int Id { get; set; }
        [Required]
        public string Title { get; set; }
        [Required]

        public string TitleDescription { get; set; }
        [Required]

        public string PriceDescription { get; set; }
        [Required]

        
        [Display(Name = "Price")]
        [Range(1, 200)]
        public double Price { get; set; }
        [Required]

        public string Description { get; set; }
        [Required]

        [ValidateNever]
        public string ImageUrl { get; set; }


        [ForeignKey("FansCategoryId")]
        [ValidateNever]
        public FansCategory FansCategory { get; set; }
        public int FansCategoryId { get; set; }


    }
}
