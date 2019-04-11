using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using PersonDB;

namespace Json_Person_Manager.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public void Add(string firstName, string lastName, int age)
        {
            PeopleManager mgr = new PeopleManager(Properties.Settings.Default.ConStr);
            mgr.AddPerson(firstName, lastName,age);
           
        }

        [HttpPost]
        public ActionResult GetAll()
        {
            PeopleManager mgr = new PeopleManager(Properties.Settings.Default.ConStr);
            IEnumerable<Person> ppl = mgr.GetAllPeople();
            return Json(ppl);
        }

        public ActionResult EditPerson(int? id)
        {
            //if (!id.HasValue)
            //{
            //    return Redirect("/people/showpeople");
            //}
            PeopleManager mgr = new PeopleManager(Properties.Settings.Default.ConStr);
            Person person = mgr.SelectPerson(id);
            return Json(person);
        }

        public void Delete(int Id)
        {
            PeopleManager mgr = new PeopleManager(Properties.Settings.Default.ConStr);
            mgr.DeletePerson(Id);

        }

        [HttpPost]
        public void Update(string firstName, string lastName, int age, int id)
        {
            PeopleManager mgr = new PeopleManager(Properties.Settings.Default.ConStr);
            mgr.EditPerson(firstName,lastName,age,id);
            
        }

    }
}