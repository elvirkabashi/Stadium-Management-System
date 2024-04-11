using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;
using System.ComponentModel.DataAnnotations.Schema;

namespace MySqlWebApi.Model
{
    public class Events
    {
        [Key]
        public int Id { get; set; }

        public string Titulli { get; set; }

        public DateTime Date { get; set; }

        public string Location { get; set; }

        public string EventType { get; set; }

        public string Description { get; set; }

        [Required(ErrorMessage = "Status is required")]
        [RegularExpression(@"^(Pending|InProgress|Completed)$", ErrorMessage = "Status must be one of: Pending, InProgress, Completed")]
        public string Status { get; set; }

        [ForeignKey("EventCategoryId")]
        [ValidateNever]
        public EventsCategory EventsCategory { get; set; }
    }
}
