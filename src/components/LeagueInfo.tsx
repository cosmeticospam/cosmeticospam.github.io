import { useState, FormEvent } from 'react';
import { MapPin, Shield, Users, Mail, Phone, Clock, DollarSign, CheckCircle } from 'lucide-react';

export default function LeagueInfo() {
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    team: '',
    phone: '',
    message: '',
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (contactForm.name && contactForm.email && contactForm.message) {
      setFormSubmitted(true);
    }
  };

  const rules = [
    {
      title: 'Tiempos de Juego',
      desc: 'Cada partido consta de 2 tiempos de 45 minutos cada uno, con un intervalo de descanso de 15 minutos.',
    },
    {
      title: 'Cambios Permitidos',
      desc: 'Se permiten hasta 5 sustituciones por partido en 3 ventanas de cambio (excluyendo el entretiempo).',
    },
    {
      title: 'Planilla de Jugadores',
      desc: 'Cada equipo puede inscribir un máximo de 22 jugadores y un mínimo de 15. No se permiten jugadores sin registrar.',
    },
    {
      title: 'Puntajes Oficiales',
      desc: 'Victoria otorga 3 puntos, Empate otorga 1 punto y Derrota otorga 0 puntos. W.O. otorga 3 pts y marcador 3-0.',
    },
  ];

  const venues = [
    {
      name: 'Club Campestre Sede Norte',
      address: 'Autopista Norte KM 14, Bogotá',
      pitchCount: '4 Canchas de Césped Natural profesional',
      amenities: ['Parqueadero vigilado', 'Vestuarios con duchas', 'Cafetería / Zona Gastro', 'Tribunas cubiertas'],
      contact: '+57 321 456 7890',
    },
    {
      name: 'Sede Pradera Fútbol Club',
      address: 'Calle 170 # 54-20, Bogotá',
      pitchCount: '3 Canchas de Sintética con iluminación LED',
      amenities: ['Canchas con estándar FIFA', 'Zonas de hidratación', 'Tienda deportiva', 'Parqueadero de bicicletas'],
      contact: '+57 310 987 6543',
    },
  ];

  return (
    <div id="league-info-container" className="space-y-8">
      {/* Rules and business metrics banner */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Rules Card */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-xl border border-slate-100">
          <h3 className="text-xl font-black text-slate-800 flex items-center gap-2 mb-6">
            <Shield className="w-5 h-5 text-emerald-600" />
            Reglamento Oficial de la Liga
          </h3>
          <div className="space-y-5">
            {rules.map((rule, idx) => (
              <div key={idx} className="flex gap-4 items-start">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-50 text-emerald-600 text-xs font-bold flex items-center justify-center">
                  {idx + 1}
                </span>
                <div>
                  <h4 className="text-sm font-extrabold text-slate-800">{rule.title}</h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">{rule.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Commercial Registration / Cost Card */}
        <div className="bg-gradient-to-br from-slate-900 to-emerald-950 text-white p-6 sm:p-8 rounded-3xl shadow-xl border border-white/5 flex flex-col justify-between">
          <div className="space-y-4">
            <span className="inline-block bg-white/10 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-emerald-300">
              Inscripciones Abiertas - Torneo Clausura
            </span>
            <h3 className="text-2xl font-black tracking-tight">¿Quieres inscribir tu equipo?</h3>
            <p className="text-sm text-slate-300 leading-relaxed font-light">
              La Liga de Oro se realiza semestralmente. El paquete de inscripción empresarial y amateur incluye:
            </p>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <span className="text-emerald-400">✓</span> 14 partidos garantizados por torneo.
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-400">✓</span> Arbitraje profesional en todas las fechas.
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-400">✓</span> Fotografía profesional y cobertura de video.
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-400">✓</span> Premiación en efectivo e indumentaria de campeones.
              </li>
            </ul>
          </div>

          <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Costo de Inscripción</div>
              <div className="text-2xl font-black text-emerald-400 flex items-center gap-0.5 mt-0.5">
                <DollarSign className="w-5 h-5" />
                1'800,000 <span className="text-xs text-slate-400 font-normal">COP / Equipo</span>
              </div>
            </div>
            <a
              href="#contact-form"
              className="px-5 py-3 bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-xs rounded-xl transition-all shadow-lg shadow-emerald-900/40 text-center"
            >
              Inscribir Equipo Ahora
            </a>
          </div>
        </div>
      </div>

      {/* Venues / Fields details */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-xl border border-slate-100">
        <h3 className="text-xl font-black text-slate-800 flex items-center gap-2 mb-6">
          <MapPin className="w-5 h-5 text-emerald-600" />
          Nuestras Sedes Deportivas
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {venues.map((venue, index) => (
            <div key={index} className="bg-slate-50 p-5 rounded-2xl border border-slate-150/70 flex flex-col justify-between">
              <div>
                <h4 className="text-base font-extrabold text-slate-800 mb-1">{venue.name}</h4>
                <div className="flex items-center gap-1 text-xs text-slate-400 font-medium mb-4">
                  <MapPin className="w-3.5 h-3.5 text-slate-300" />
                  <span>{venue.address}</span>
                </div>
                
                <div className="space-y-3">
                  <div className="text-xs">
                    <span className="font-bold text-slate-500 block">Infraestructura:</span>
                    <span className="text-slate-700">{venue.pitchCount}</span>
                  </div>
                  <div className="text-xs">
                    <span className="font-bold text-slate-500 block">Servicios y Comodidades:</span>
                    <div className="flex flex-wrap gap-1.5 mt-1.5">
                      {venue.amenities.map((amenity, aIdx) => (
                        <span key={aIdx} className="bg-white px-2.5 py-1 rounded-lg text-slate-600 border border-slate-100 shadow-sm font-medium">
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200/50 flex justify-between items-center text-xs">
                <span className="text-slate-400 font-medium">Contacto Sede:</span>
                <span className="font-bold text-slate-800 font-mono">{venue.contact}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Form Section */}
      <div id="contact-form" className="bg-white p-6 sm:p-8 rounded-3xl shadow-xl border border-slate-100">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-4">
            <h3 className="text-xl font-black text-slate-800 flex items-center gap-2">
              <Mail className="w-5 h-5 text-emerald-600" />
              Contacto y Soporte
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              ¿Tienes dudas sobre los calendarios, reclamos reglamentarios o estás interesado en patrocinar el campeonato? Completa el formulario y nos contactaremos contigo en menos de 24 horas.
            </p>
            <div className="space-y-3 pt-2 text-xs text-slate-600 font-medium">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-500" />
                <span>+57 (1) 789-4560 (Lunes a Viernes, 8AM - 5PM)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-500" />
                <span>info@ligadeorofutbol.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-500" />
                <span>Atención fines de semana directamente en planillas de sedes.</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            {formSubmitted ? (
              <div className="bg-emerald-50 border border-emerald-100 p-8 rounded-2xl text-center space-y-3">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-slate-800">¡Mensaje enviado correctamente!</h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Agradecemos tu interés. Un administrador de la Liga de Oro revisará tu solicitud y te contactará pronto.
                </p>
                <button
                  onClick={() => {
                    setContactForm({ name: '', email: '', team: '', phone: '', message: '' });
                    setFormSubmitted(false);
                  }}
                  className="px-4 py-2 bg-white border border-emerald-200 text-emerald-700 hover:bg-emerald-50 transition rounded-xl text-xs font-bold cursor-pointer"
                >
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Nombre completo *</label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      placeholder="Ej. Juan Pérez"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 px-3.5 py-2.5 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-slate-800"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Correo Electrónico *</label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      placeholder="juan@correo.com"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 px-3.5 py-2.5 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-slate-800"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Nombre del Equipo (Opcional)</label>
                    <input
                      id="contact-team"
                      type="text"
                      placeholder="Ej. Real Bogotá"
                      value={contactForm.team}
                      onChange={(e) => setContactForm({ ...contactForm, team: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 px-3.5 py-2.5 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-slate-800"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Teléfono de contacto</label>
                    <input
                      id="contact-phone"
                      type="tel"
                      placeholder="321 456 7890"
                      value={contactForm.phone}
                      onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 px-3.5 py-2.5 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-slate-800"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Mensaje o Solicitud *</label>
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    placeholder="Escribe aquí tu consulta reglamentaria o interés en participar en el próximo torneo..."
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 px-3.5 py-2.5 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-slate-800 resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 transition-all text-white font-bold text-xs rounded-xl shadow-md cursor-pointer"
                >
                  Enviar mensaje a la administración
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
